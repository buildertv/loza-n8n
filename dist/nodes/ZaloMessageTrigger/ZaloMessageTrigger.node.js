"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloMessageTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const zalo_sdk_1 = require("../zalo-sdk");

// Store api instances and timers globally to manage across webhook calls
const activeConnections = {};

function getConnectionId(node) {
    return `${node.getWorkflow().id}_${node.getNode().id}`;
}

class ZaloMessageTrigger {
    constructor() {
        this.description = {
            displayName: 'Zalo Message Trigger',
            name: 'zaloMessageTrigger',
            icon: 'file:../shared/zalo.svg',
            group: ['trigger'],
            version: 1,
            description: 'Lắng nghe các sự kiện trên Zalo',
            defaults: {
                name: 'Zalo Message Trigger',
            },
            inputs: [],
            outputs: ['main'],
            webhooks: [
                {
                    name: 'default',
                    httpMethod: 'POST',
                    responseMode: 'onReceived',
                    path: 'webhook',
                },
            ],
            credentials: [
                {
                    name: 'zaloApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Events',
                    name: 'events',
                    type: 'multiOptions',
                    options: [
                        { name: 'Message', value: 'message', description: 'Tin nhắn mới (người dùng & nhóm)' },
                        { name: 'Undo Message', value: 'undo', description: 'Tin nhắn bị thu hồi' },
                        { name: 'Reaction', value: 'reaction', description: 'Tương tác (thả cảm xúc) với tin nhắn' },
                        { name: 'Typing', value: 'typing', description: 'Ai đó đang gõ tin nhắn' },
                        { name: 'Group Event', value: 'group_event', description: 'Sự kiện trong nhóm (tham gia, rời khỏi, đổi tên...)' },
                        { name: 'Friend Event', value: 'friend_event', description: 'Sự kiện bạn bè (kết bạn, hủy bạn...)' },
                        { name: 'Seen Messages', value: 'seen_messages', description: 'Tin nhắn đã được xem' },
                        { name: 'Delivered Messages', value: 'delivered_messages', description: 'Tin nhắn đã được gửi thành công' },
                        { name: 'Reminder', value: 'reminder', description: 'Sự kiện nhắc nhở (tạo, cập nhật, phản hồi)' },
                        { name: 'Poll', value: 'poll', description: 'Sự kiện bình chọn (tạo, cập nhật, bình chọn)' },
                    ],
                    default: ['message'],
                    required: true,
                    description: 'Các loại sự kiện muốn lắng nghe',
                },
                {
                    displayName: 'Self Listen',
                    name: 'selfListen',
                    type: 'boolean',
                    default: false,
                    required: true,
                    description: 'Cho phép lắng nghe sự kiện của chính mình',
                },
                {
                    displayName: 'Thread Type Filter',
                    name: 'threadTypeFilter',
                    type: 'options',
                    options: [
                        { name: 'All', value: 'all' },
                        { name: 'User Only', value: 'user' },
                        { name: 'Group Only', value: 'group' }
                    ],
                    default: 'all',
                    description: 'Lọc sự kiện theo loại thread',
                },
                {
                    displayName: 'Auto Reconnect Settings',
                    name: 'reconnectSettings',
                    type: 'collection',
                    placeholder: 'Add Reconnect Setting',
                    default: {},
                    options: [
                        {
                            displayName: 'Max Retry Count',
                            name: 'maxRetryCount',
                            type: 'number',
                            default: 10,
                            description: 'Số lần thử kết nối lại tối đa',
                        },
                        {
                            displayName: 'Retry Interval (seconds)',
                            name: 'retryInterval',
                            type: 'number',
                            default: 5,
                            description: 'Thời gian chờ giữa các lần thử kết nối lại (giây)',
                        }
                    ],
                },
                {
                    displayName: 'Allowed Thread IDs',
                    name: 'allowedThreadIds',
                    type: 'string',
                    default: '',
                    description: 'Lắng nghe sự kiện từ các ID này (cách nhau bằng dấu phẩy). Để trống để nghe tất cả.',
                    placeholder: '123456789,987654321',
                },
                {
                    displayName: 'Blocked Thread IDs',
                    name: 'blockedThreadIds',
                    type: 'string',
                    default: '',
                    description: 'Bỏ qua sự kiện từ các ID này (cách nhau bằng dấu phẩy).',
                    placeholder: '123456789,987654321',
                },


            ],
        };

        this.webhookMethods = {
            default: {
                async checkExists() {
                    const webhookData = this.getWorkflowStaticData('node');
                    return !!webhookData.isConnected;
                },

                async create() {
                    const connectionId = getConnectionId(this);
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const webhookData = this.getWorkflowStaticData('node');

                    const credentials = await this.getCredentials('zaloApi');
                    const selfListen = this.getNodeParameter('selfListen', false);
                    const events = this.getNodeParameter('events', ['message']);
                    const allowedThreadIdsRaw = this.getNodeParameter('allowedThreadIds', '');
                    const blockedThreadIdsRaw = this.getNodeParameter('blockedThreadIds', '');

                    const allowedThreadIds = allowedThreadIdsRaw.split(',').map(id => id.trim()).filter(id => id);
                    const blockedThreadIds = blockedThreadIdsRaw.split(',').map(id => id.trim()).filter(id => id);

                    const reconnectSettings = this.getNodeParameter('reconnectSettings', {});
                    const maxRetryCount = reconnectSettings.maxRetryCount || 10;
                    const retryInterval = (reconnectSettings.retryInterval || 5) * 1000;
                    const threadTypeFilter = this.getNodeParameter('threadTypeFilter', 'all');

                    const connect = async (retryCount = 0) => {
                        try {
                            const cookieFromCred = JSON.parse(credentials.cookie);
                            const zalo = new zalo_sdk_1.Zalo({ selfListen });
                            const api = await zalo.login({
                                cookie: cookieFromCred,
                                imei: credentials.imei,
                                userAgent: credentials.userAgent
                            });

                            if (!api) {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Login failed, no API instance.');
                            }

                            activeConnections[connectionId] = { api, reconnectTimer: null, retryCount: 0 };

                            const selfUid = api.context && (api.context.uid || api.context.userId);
                            console.log('[Zalo Trigger] selfUid sau login:', selfUid, '| context:', api.context);

                            const handleEvent = (eventName, data) => {
                                console.log('[Zalo Trigger] Nhận event:', eventName, '| data:', JSON.stringify(data));
                                
                                // Lọc theo thread type
                                if (threadTypeFilter !== 'all' && data.threadType) {
                                    const isGroup = data.threadType === zalo_sdk_1.ThreadType.Group;
                                    if ((threadTypeFilter === 'user' && isGroup) || 
                                        (threadTypeFilter === 'group' && !isGroup)) {
                                        return;
                                    }
                                }
                                
                                // Lọc theo thread ID
                                const threadId = data.threadId;
                                if (threadId) {
                                    if (allowedThreadIds.length > 0 && !allowedThreadIds.includes(threadId)) return;
                                    if (blockedThreadIds.length > 0 && blockedThreadIds.includes(threadId)) return;
                                }

                                // Xử lý đặc biệt cho sự kiện reminder
                                if (eventName === 'reminder') {
                                    // Thêm thông tin bổ sung cho sự kiện reminder
                                    data.reminderType = data.type || 'unknown';
                                    data.reminderAction = data.action || 'unknown';
                                }

                                this.helpers.httpRequest({
                                    method: 'POST',
                                    url: webhookUrl,
                                    body: { eventName, data },
                                    headers: { 'Content-Type': 'application/json' },
                                });
                            };




                            for (const eventName of events) {
                                api.listener.on(eventName, (data) => handleEvent(eventName, data));
                            }

                            api.listener.on('closed', (code) => {
                                // 1000 is manual closure
                                if (code !== 1000 && activeConnections[connectionId]) {
                                    const connection = activeConnections[connectionId];
                                    connection.retryCount = (connection.retryCount || 0) + 1;
                                    
                                    if (connection.retryCount <= maxRetryCount) {
                                        console.log(`Zalo connection closed with code ${code}. Reconnecting in ${retryInterval/1000}s... (Attempt ${connection.retryCount}/${maxRetryCount})`);
                                        connection.reconnectTimer = setTimeout(() => {
                                            connect(connection.retryCount);
                                        }, retryInterval);
                                    } else {
                                        console.log(`Zalo connection closed with code ${code}. Max retry count reached (${maxRetryCount}).`);
                                    }
                                }
                            });
                            
                            api.listener.on('error', (error) => {
                                console.error('Zalo listener error:', error);
                            });

                            // Sử dụng cơ chế retry và rotate của SDK mới
                            api.listener.start({ retryOnClose: true });
                            webhookData.isConnected = true;
                            console.log('Zalo Trigger activated successfully.');

                        } catch (error) {
                            await this.delete();
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Zalo connection failed: ${error.message}`);
                        }
                    };

                    await connect();
                    return true;
                },

                async delete() {
                    const connectionId = getConnectionId(this);
                    const webhookData = this.getWorkflowStaticData('node');
                    const connection = activeConnections[connectionId];

                    if (connection) {
                        if (connection.api) {
                            connection.api.listener.stop();
                        }
                        if (connection.reconnectTimer) {
                            clearTimeout(connection.reconnectTimer);
                        }
                        delete activeConnections[connectionId];
                    }

                    delete webhookData.isConnected;
                    console.log('Zalo Trigger deactivated.');
                    return true;
                },
            },
        };
    }

    async webhook() {
        const req = this.getRequestObject();
        const { eventName, data } = req.body;

        // Định dạng dữ liệu trả về tùy theo loại sự kiện
        let returnData = {
            event: eventName,
            ...data,
        };

        // Xử lý đặc biệt cho một số loại sự kiện
        switch (eventName) {
            case 'reminder':
                returnData = {
                    ...returnData,
                    reminderInfo: {
                        type: data.reminderType || 'unknown',
                        action: data.reminderAction || 'unknown',
                        timestamp: data.timestamp || Date.now(),
                    }
                };
                break;
            
            case 'poll':
                returnData = {
                    ...returnData,
                    pollInfo: {
                        pollId: data.pollId,
                        action: data.action || 'unknown',
                    }
                };
                break;
        }

        return {
            workflowData: [this.helpers.returnJsonArray([returnData])],
        };
    }
}
exports.ZaloMessageTrigger = ZaloMessageTrigger;
//# sourceMappingURL=ZaloMessageTrigger.node.js.map