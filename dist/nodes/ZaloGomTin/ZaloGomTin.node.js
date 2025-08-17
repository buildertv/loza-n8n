"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloGomTin = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const dbManager = require('../utils/dbManager');

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

class ZaloGomTin {
    constructor() {
        this.description = {
            displayName: 'Zalo Gom Tin Nhắn',
            name: 'zaloGomTin',
            icon: 'file:../shared/zalo.svg',
            group: ['Zalo'],
            version: 1,
            description: 'Gom tin nhắn Zalo và chờ trong một khoảng thời gian',
            defaults: { name: 'Zalo Gom Tin Nhắn' },
            inputs: ['main'],
            outputs: ['main', 'main'],
            outputNames: ['Kết quả', 'Bỏ qua'],

            credentials: [
                {
                    name: 'redis',
                    required: true,
                    displayOptions: {
                        show: {
                            '/dbType': ['redis'],
                        },
                    },
                },
                {
                    name: 'zaloPostgres',
                    required: true,
                    displayOptions: {
                        show: {
                            '/dbType': ['postgres'],
                        },
                    },
                },
                {
                    name: 'zaloMySql',
                    required: true,
                    displayOptions: {
                        show: {
                            '/dbType': ['mysql'],
                        },
                    },
                },
            ],

            properties: [
                {
                    displayName: 'Loại Cơ Sở Dữ Liệu',
                    name: 'dbType',
                    type: 'options',
                    options: [
                        { name: 'Redis', value: 'redis' },
                        { name: 'PostgreSQL', value: 'postgres' },
                        { name: 'MySQL', value: 'mysql' },
                    ],
                    default: 'redis',
                    description: 'Chọn loại cơ sở dữ liệu để lưu trữ tin nhắn tạm thời.',
                },
                {
                    displayName: 'ID Nhóm Chat (Thread ID)',
                    name: 'thread_id',
                    type: 'string',
                    default: '={{ $json.message.threadId }}',
                    placeholder: 'ID định danh của cuộc trò chuyện',
                    description: 'ID định danh duy nhất của cuộc trò chuyện để gom tin nhắn.',
                },
                {
                    displayName: 'Nội Dung Tin Nhắn',
                    name: 'message_content',
                    type: 'string',
                    default: '={{ $json.message.data.content }}',
                    placeholder: 'Nội dung tin nhắn',
                    description: 'Nội dung tin nhắn cần gom.',
                },
                {
                    displayName: 'Thời Gian Chờ (giây)',
                    name: 'waitTime',
                    type: 'number',
                    default: 10,
                    description: 'Thời gian chờ (tính bằng giây) trước khi gom và gửi tin nhắn.',
                }
            ],
        };
    }

    async execute() {
        const items = this.getInputData();
        let dbOperations;

        try {
            const thread_id = this.getNodeParameter('thread_id', 0, '');
            const message_content = this.getNodeParameter('message_content', 0, '');
            console.log(`\n--- [ZaloGomTin] START Execution for thread_id: ${thread_id} ---`);
            console.log(`[ZaloGomTin] Received message: "${message_content}"`);

            dbOperations = await dbManager.getDbOperations(this);
            const waitTime = this.getNodeParameter('waitTime', 0, 5);

            const debounceKey = `zalo_message_collector_debounce:${thread_id}`;
            const contentKey = `zalo_message_collector_content:${thread_id}`;
            const currentTime = new Date().getTime().toString();
            console.log(`[ZaloGomTin] Current execution time ID: ${currentTime}`);

            // Luôn cập nhật thời gian để reset bộ đếm debounce
            await dbOperations.set(debounceKey, currentTime);
            console.log(`[ZaloGomTin] Set debounceKey (${debounceKey}) to: ${currentTime}`);

            // Lấy nội dung cũ, thêm nội dung mới và lưu lại
            let lastContent = await dbOperations.get(contentKey);
            let contentArray = lastContent ? JSON.parse(lastContent) : [];
            console.log(`[ZaloGomTin] Content BEFORE add: ${JSON.stringify(contentArray)}`);
            contentArray.push(message_content);
            await dbOperations.set(contentKey, JSON.stringify(contentArray));
            console.log(`[ZaloGomTin] Content AFTER add: ${JSON.stringify(contentArray)}`);

            // Chờ hết thời gian debounce
            console.log(`[ZaloGomTin] Waiting for ${waitTime} seconds...`);
            await sleep(waitTime * 1000);

            // Sau khi chờ, kiểm tra xem có tin nhắn nào mới hơn không
            const finalDebounceTime = await dbOperations.get(debounceKey);
            console.log(`[ZaloGomTin] After wait, debounceKey in DB is: ${finalDebounceTime}`);
            console.log(`[ZaloGomTin] Comparing DB time (${finalDebounceTime}) with execution time (${currentTime})`);

            // Nếu thời gian trong DB không phải là của lần thực thi này, nghĩa là có tin nhắn mới hơn đã đến. Bỏ qua.
            if (finalDebounceTime !== currentTime) {
                console.log('[ZaloGomTin] SKIPPING: Newer message arrived. This is normal for intermediate messages.');
                console.log('--- [ZaloGomTin] END Execution (Skipped) ---\n');
                return [[], [items[0]]];
            }

            console.log('[ZaloGomTin] PROCEEDING: This is the last message in the sequence.');
            await dbOperations.del(debounceKey);
            const finalContent = await dbOperations.get(contentKey);
            await dbOperations.del(contentKey);
            console.log('[ZaloGomTin] Deleted debounceKey and contentKey from DB.');

            let finalContentArray = finalContent ? JSON.parse(finalContent) : [];
            console.log(`[ZaloGomTin] Final collected content: ${JSON.stringify(finalContentArray)}`);

            if (finalContentArray.length <= 0) {
                console.log('[ZaloGomTin] No content to return. Skipping.');
                console.log('--- [ZaloGomTin] END Execution (No Content) ---\n');
                return [[], [items[0]]]; // Bỏ qua
            } else {
                const returnItem = {
                    json: {
                        threadId: thread_id,
                        messages: finalContentArray,
                        content: finalContentArray.join(' '),
                    },
                    pairedItem: { item: 0 },
                };
                console.log('[ZaloGomTin] Returning collected messages.');
                console.log('--- [ZaloGomTin] END Execution (Success) ---\n');
                return [[returnItem], []];
            }
        } catch (error) {
            console.error(`[ZaloGomTin] ERROR: ${error.stack}`);
            if (this.continueOnFail()) {
                const errorItem = { json: { error: error.message }, pairedItem: { item: 0 } };
                return [[], [errorItem]];
            }
            throw error;
        } finally {
            if (dbOperations && dbOperations.quit) {
                await dbOperations.quit();
            }
        }
    }
}
exports.ZaloGomTin = ZaloGomTin;