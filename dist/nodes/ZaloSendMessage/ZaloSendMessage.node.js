"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloSendMessage = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const zalo_sdk_1 = require("../zalo-sdk");
const ZaloSendMessageDescription_1 = require("./ZaloSendMessageDescription");
const helper_1 = require("../utils/helper");
const helper_2 = require("../utils/helper");
let api;
class ZaloSendMessage {
    constructor() {
        this.description = {
            displayName: 'Zalo Send Message',
            name: 'zaloSendMessage',
            icon: 'file:../shared/zalo.svg',
            group: ['Zalo'],
            version: 4,
            description: 'Gửi tin nhắn qua API Zalo sử dụng kết nối đăng nhập bằng cookie',
            defaults: {
                name: 'Zalo Send Message',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'zaloApi',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['zaloSendMessage', 'zaloTTS'],
                        },
                    },
                },
                {
                    name: 'zaloTTSApi',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['zaloTTS'],
                        },
                    },
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Zalo Send Message',
                            value: 'zaloSendMessage',
                        },
                        {
                            name: 'Zalo Text To Speech',
                            value: 'zaloTTS',
                        },
                    ],
                    default: 'zaloSendMessage',
                },
                ...ZaloSendMessageDescription_1.zaloSendMessageOperations,
                ...ZaloSendMessageDescription_1.zaloSendMessageFields,
                
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['zaloTTS'],
                        },
                    },
                    options: [
                        {
                            name: 'Convert Text to Speech',
                            value: 'convertTTS',
                            action: 'Convert text to speech and return the URL',
                        },
                        {
                            name: 'Send TTS Message',
                            value: 'sendTTSMessage',
                            action: 'Convert text to speech and send it as a message',
                        },
                    ],
                    default: 'convertTTS',
                },
                {
                    displayName: 'Thread ID',
                    name: 'threadId',
                    type: 'string',
                    default: '',
                    required: true,
                    description: 'ID of the user or group to send the message to',
                    displayOptions: {
                        show: {
                            resource: ['zaloTTS'],
                            operation: ['sendTTSMessage'],
                        },
                    },
                },
                {
                    displayName: 'Type',
                    name: 'type',
                    type: 'options',
                    options: [
                        { name: 'User', value: 0 },
                        { name: 'Group', value: 1 },
                    ],
                    default: 0,
                    description: 'The type of the thread',
                    displayOptions: {
                        show: {
                            resource: ['zaloTTS'],
                            operation: ['sendTTSMessage'],
                        },
                    },
                },
                {
                    displayName: 'Text',
                    name: 'text',
                    type: 'string',
                    default: '',
                    required: true,
                    typeOptions: {
                        rows: 4,
                    },
                    description: 'The text to convert to speech',
                    displayOptions: {
                        show: {
                            resource: ['zaloTTS'],
                        },
                    },
                },
                {
                    displayName: 'Voice (Giọng đọc)',
                    name: 'voice',
                    type: 'options',
                    options: [
                        { name: 'Phụ nữ miền Nam 1', value: '1' },
                        { name: 'Phụ nữ miền Bắc 1', value: '2' },
                        { name: 'Đàn ông miền Nam', value: '3' },
                        { name: 'Đàn ông miền Bắc', value: '4' },
                        { name: 'Phụ nữ miền Bắc 2', value: '5' },
                        { name: 'Phụ nữ miền Nam 2', value: '6' },
                    ],
                    default: '1',
                    description: 'The voice to use for the speech synthesis',
                    displayOptions: {
                        show: {
                            resource: ['zaloTTS'],
                        },
                    },
                },
                {
                    displayName: 'EnCode Output',
                    name: 'encode_type',
                    type: 'options',
                    options: [
                        { name: 'WAV', value: '0' },
                        { name: 'MP3', value: '1' },
                        { name: 'AAC', value: '2' },        
                    ],
                    default: '0',
                    description: 'Thể loại mã hóa',
                    displayOptions: {
                        show: {
                            resource: ['zaloTTS'],
                        },
                    },
                },
                {
                    displayName: 'Speed',
                    name: 'speed',
                    type: 'number',
                    typeOptions: {
                        minValue: 0.8,
                        maxValue: 1.2,
                    },
                    default: 1.0,
                    description: 'Playback speed, from 0.8 to 1.2',
                    displayOptions: {
                        show: {
                            resource: ['zaloTTS'],
                        },
                    },
                },
            ],
        };
    }
    async execute() {
        const returnData = [];
        const items = this.getInputData();
        const zaloCred = await this.getCredentials('zaloApi');
        const cookieFromCred = JSON.parse(zaloCred.cookie);
        const imeiFromCred = zaloCred.imei;
        const userAgentFromCred = zaloCred.userAgent;
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        try {
            const zalo = new zalo_sdk_1.Zalo();
            api = await zalo.login({
                cookie: cookieFromCred,
                imei: imeiFromCred,
                userAgent: userAgentFromCred
            });
            if (!api) {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Failed to initialize Zalo API. Check your credentials.');
            }
        }
        catch (error) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Zalo login error: ${error.message}`);
        }
        for (let i = 0; i < items.length; i++) {
            try {
                if(resource === 'zaloSendMessage') {
                if(operation === 'sendDeliveredEvent') {
                    // Lấy dữ liệu từ input
                    const threadType = this.getNodeParameter('threadType', i);
                    const messagesRaw = this.getNodeParameter('messages', i);
                    const isSeen = this.getNodeParameter('isSeen', i, false);
                    let messages;
                    try {
                        messages = typeof messagesRaw === 'string' ? JSON.parse(messagesRaw) : messagesRaw;
                    } catch (e) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Messages phải là JSON array hợp lệ');
                    }
                    if (!Array.isArray(messages) || messages.length === 0) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Messages phải là mảng và không được rỗng');
                    }
                    // Gọi hàm gửi delivered event
                    if (!api || typeof api.sendDeliveredEvent !== 'function') {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'API chưa hỗ trợ gửi delivered event');
                    }
                    const response = await api.sendDeliveredEvent(threadType, messages, isSeen);
                    returnData.push({
                        json: {
                            success: true,
                            response,
                            threadType,
                            messages,
                            isSeen
                        },
                    });
                }
                    if(operation === 'sendMessage') {
                        // Lấy các trường cơ bản như cũ
                        const threadId = this.getNodeParameter('threadId', i);
                        const typeNumber = this.getNodeParameter('type', i);
                        const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
                        const message = this.getNodeParameter('message', i);
                        const urgency = this.getNodeParameter('urgency', i, 0);

                        // Lấy các trường nâng cao từ collection
                        const advancedOptions = this.getNodeParameter('advancedOptions', i, {});
                        const quote = advancedOptions.quote || {};
                        let quoteData = {};
                        if (quote.mode === 'auto' || !quote.mode) {
                            // Tự động lấy từ node trước (giá trị mẫu, bạn có thể điều chỉnh lấy từ items[i] nếu cần)
                            const messageData = (items[i].json && items[i].json.message && items[i].json.message.data) ? items[i].json.message.data : {};
                            quoteData = {
                                msgId: messageData.msgId,
                                uidFrom: messageData.uidFrom,
                                cliMsgId: messageData.cliMsgId,
                                content: messageData.content,
                                ttl: '0',
                            };
                        } else {
                            quoteData = {
                                msgId: quote.msgId,
                                uidFrom: quote.uidFrom,
                                cliMsgId: quote.cliMsgId,
                                content: quote.contentquote,
                                ttl: '0',
                            };
                        }
                        const mentions = advancedOptions.mentions || {};
                        const attachments = advancedOptions.attachments || {};
                        const messageContent = {
                            msg: message,
                        };
                        if (urgency !== 0) {
                            messageContent.urgency = urgency;
                        }
                        if (quote && Object.keys(quote).length > 0) {
                            messageContent.quote = quoteData;
                        }
                        if (mentions && Object.keys(mentions).length > 0) {
                            messageContent.mentions = [{
                                    pos: mentions.pos || 0,
                                    uid: mentions.uid,
                                    len: mentions.len || 0,
                                }];
                        }
                        if (attachments && attachments.attachment && attachments.attachment.length > 0) {
                            messageContent.attachments = [];
                            for (const attachment of attachments.attachment) {
                                let fileData;
                                if (attachment.type === 'url') {
                                    fileData = await (0, helper_1.saveImage)(attachment.imageUrl);
                                }
                                messageContent.attachments.push(fileData);
                            }
                        }
                        this.logger.info(`Sending message with parameters: ${JSON.stringify(messageContent)}`);
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        try {
                            const recipentObj = {
                                id: threadId,
                                type: type
                            };
                            this.logger.info("Send! typing event", { threadId, type });
                            const result = await api.sendTypingEvent(recipentObj.id, {
                                type: recipentObj.type
                            });
                            if (!!result) {
                                this.logger.info("Send! typing event");
                            }
                        }
                        catch (e) {
                            this.logger.error("Cannot send typing event");
                        }
                        const response = await api.sendMessage(messageContent, threadId, type);
                        if (messageContent.attachments && messageContent.attachments.length > 0) {
                            for (const attachment of messageContent.attachments) {
                                this.logger.info(`Remove attachment: ${attachment}`);
                                (0, helper_2.removeImage)(attachment);
                            }
                        }
                        this.logger.info('Message sent successfully', { threadId, type });

                        returnData.push({
                            json: {
                                success: true,
                                response,
                                threadId,
                                threadType: type,
                                messageContent,
                            },
                        });
                }
                if (operation === 'getStickers') {
                    // Lấy danh sách sticker, có thể truyền queryString nếu có
                    if (!api) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                    }
                    let result;
                    const queryString = this.getNodeParameter('queryString', i, '');
                    if (queryString && typeof queryString === 'string' && queryString.trim() !== '') {
                        result = await api.getStickers(queryString);
                    } else {
                        result = await api.getStickers();
                    }
                    returnData.push({ json: result });
                }
                if (operation === 'getStickersDetail') {
                    // Lấy chi tiết sticker
                    const stickerId = this.getNodeParameter('stickerId', i);
                    if (!api) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                    }
                    const result = await api.getStickersDetail(stickerId);
                    returnData.push({ json: result });
                }
                if (operation === 'sendSticker') {
                    // Gửi sticker vào thread
                    const threadId = this.getNodeParameter('threadId', i);
                    const stickerId = this.getNodeParameter('stickerId', i);
                    const typeNumber = this.getNodeParameter('type', i);
                    const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
                    if (!api) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                    }
                    // Lấy chi tiết sticker
                    const stickerDetailResp = await api.getStickersDetail(stickerId);
                    const stickerObj = Array.isArray(stickerDetailResp) ? stickerDetailResp[0] : stickerDetailResp;
                    if (!stickerObj || !stickerObj.id || !stickerObj.cateId || !stickerObj.type) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Sticker detail is invalid or missing required fields');
                    }
                    // Gửi sticker
                    const response = await api.sendSticker(stickerObj, threadId, type);
                    returnData.push({
                        json: {
                            success: true,
                            response,
                            threadId,
                            stickerId,
                            stickerObj,
                        },
                    });
                }
				if (operation === 'sendVoice') {
					const threadId = this.getNodeParameter('threadId', i);
					const typeNumber = this.getNodeParameter('type', i);
					const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
					const voiceUrl = this.getNodeParameter('voiceUrl', i);

					if (!voiceUrl) {
						throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Voice URL is required.', { itemIndex: i });
					}

					if (!api) {
						throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
					}

					const response = await api.sendVoice({ voiceUrl: voiceUrl }, threadId, type);

					returnData.push({
						json: {
							success: true,
							response,
							threadId,
							threadType: type,
						},
					});
				}
				if (operation === 'sendCard') {
					const threadId = this.getNodeParameter('threadId', i);
					const typeNumber = this.getNodeParameter('type', i);
					const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
					const userId = this.getNodeParameter('userId', i);
					const phoneNumber = this.getNodeParameter('phoneNumber', i, '');

					if (!userId) {
						throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'User ID (for card) is required.', { itemIndex: i });
					}

					if (!api) {
						throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
					}

					const cardOptions = {
						userId: userId,
					};
					if (phoneNumber) {
						cardOptions.phoneNumber = phoneNumber;
					}

					const response = await api.sendCard(cardOptions, threadId, type);

					returnData.push({
						json: {
							success: true,
							response,
							threadId,
							threadType: type,
						},
					});
				}
				if (operation === 'sendVideo') {
					const threadId = this.getNodeParameter('threadId', i);
					const typeNumber = this.getNodeParameter('type', i);
					const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
					const videoUrl = this.getNodeParameter('videoUrl', i);
					const thumbnailUrl = this.getNodeParameter('thumbnailUrl', i);
					const caption = this.getNodeParameter('caption', i, '');
					const videoOptions = this.getNodeParameter('videoOptions', i, {});

					if (!videoUrl || !thumbnailUrl) {
						throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Video URL and Thumbnail URL are required.', { itemIndex: i });
					}

					if (!api) {
						throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
					}

					const sendVideoOptions = {
						videoUrl: videoUrl,
						thumbnailUrl: thumbnailUrl,
						msg: caption,
						duration: videoOptions.duration,
						width: videoOptions.width,
						height: videoOptions.height,
					};

					const response = await api.sendVideo(sendVideoOptions, threadId, type);

					returnData.push({
						json: {
							success: true,
							response,
							threadId,
							threadType: type,
						},
					});
				}
				// Chức năng pinConversation đã được di chuyển sang ZaloUser để tránh trùng lắp
				// với chức năng setPinnedConversations
                if (operation === 'sendMessageStatus') {
                    const threadId = this.getNodeParameter('threadId', i);
                        const typeNumber = this.getNodeParameter('type', i);
                        const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        try {
                            if (type === zalo_sdk_1.ThreadType.User) {
                                const payLoad = {
                                    type: zalo_sdk_1.ThreadType.User,
                                    destType: zalo_sdk_1.DestType.User
                                };
                                const result = await api.sendTypingEvent(threadId, payLoad);
                                if (!!result) {
                                    this.logger.info("Send! typing event User");
                                }
                            }
                            else if (type === zalo_sdk_1.ThreadType.Group) {
                                const result = await api.sendTypingEvent(threadId, {
                                    type: zalo_sdk_1.ThreadType.Group
                                });
                                if (!!result) {
                                    this.logger.info("Send! typing event Group");
                                }
                            }
                            returnData.push({
                                json: {
                                    success: true,
                                    message: "OK",
                                },
                            });
                        }
                        catch (e) {
                            this.logger.error("Cannot send typing event: " + e);
                        }
                    }
                    
                    // Xử lý gửi link
                    if (operation === 'sendLink') {
                        const threadId = this.getNodeParameter('threadId', i);
                        const typeNumber = this.getNodeParameter('type', i);
                        const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
                        const url = this.getNodeParameter('url', i);
                        const title = this.getNodeParameter('title', i, '');
                        const desc = this.getNodeParameter('desc', i, '');
                        const thumb = this.getNodeParameter('thumb', i, '');
                        
                        if (!url) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'URL is required.', { itemIndex: i });
                        }
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const linkOptions = {
                            url: url,
                            title: title,
                            desc: desc,
                            thumb: thumb
                        };
                        
                        const response = await api.sendLink(linkOptions, threadId, type);
                        
                        returnData.push({
                            json: {
                                success: true,
                                response,
                                threadId,
                                threadType: type,
                            },
                        });
                    }
                    
                    // Xử lý chuyển tiếp tin nhắn
                    if (operation === 'forwardMessage') {
                        const sourceThreadId = this.getNodeParameter('sourceThreadId', i);
                        const sourceTypeNumber = this.getNodeParameter('sourceType', i);
                        const sourceType = sourceTypeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
                        const msgId = this.getNodeParameter('msgId', i);
                        const targetThreadId = this.getNodeParameter('targetThreadId', i);
                        const targetTypeNumber = this.getNodeParameter('targetType', i);
                        const targetType = targetTypeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
                        
                        if (!msgId) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Message ID is required.', { itemIndex: i });
                        }
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const forwardOptions = {
                            sourceThreadId,
                            sourceType,
                            msgId,
                            targetThreadId,
                            targetType
                        };
                        
                        const response = await api.forwardMessage(forwardOptions);
                        
                        returnData.push({
                            json: {
                                success: true,
                                response,
                            },
                        });
                    }
                    
                    // Xử lý thêm tin nhắn nhanh
                    if (operation === 'addQuickMessage') {
                        const keyword = this.getNodeParameter('keyword', i);
                        const title = this.getNodeParameter('title', i);
                        
                        if (!keyword || !title) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Keyword and title are required.', { itemIndex: i });
                        }
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const addPayload = {
                            keyword,
                            title
                        };
                        
                        const response = await api.addQuickMessage(addPayload);
                        
                        returnData.push({
                            json: {
                                success: true,
                                response,
                            },
                        });
                    }
                    
                    // Xử lý lấy danh sách tin nhắn nhanh
                    if (operation === 'getQuickMessage') {
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const response = await api.getQuickMessage();
                        
                        returnData.push({
                            json: {
                                success: true,
                                response,
                            },
                        });
                    }
                    
                    // Xử lý cập nhật tin nhắn nhanh
                    if (operation === 'updateQuickMessage') {
                        const keyword = this.getNodeParameter('keyword', i);
                        const title = this.getNodeParameter('title', i);
                        
                        if (!keyword || !title) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Keyword and title are required.', { itemIndex: i });
                        }
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const updatePayload = {
                            keyword,
                            title
                        };
                        
                        const response = await api.updateQuickMessage(updatePayload);
                        
                        returnData.push({
                            json: {
                                success: true,
                                response,
                            },
                        });
                    }
                    
                    // Xử lý xóa tin nhắn nhanh
                    if (operation === 'removeQuickMessage') {
                        const keyword = this.getNodeParameter('keyword', i);
                        
                        if (!keyword) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Keyword is required.', { itemIndex: i });
                        }
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const response = await api.removeQuickMessage(keyword);
                        
                        returnData.push({
                            json: {
                                success: true,
                                response,
                            },
                        });
                    }
                    
                    // Xử lý đánh dấu chưa đọc
                    if (operation === 'addUnreadMark') {
                        const threadId = this.getNodeParameter('threadId', i);
                        const typeNumber = this.getNodeParameter('type', i);
                        const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const response = await api.addUnreadMark(threadId, type);
                        
                        returnData.push({
                            json: {
                                success: true,
                                response,
                            },
                        });
                    }
                    
                    // Xử lý bỏ đánh dấu chưa đọc
                    if (operation === 'removeUnreadMark') {
                        const threadId = this.getNodeParameter('threadId', i);
                        const typeNumber = this.getNodeParameter('type', i);
                        const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const response = await api.removeUnreadMark(threadId, type);
                        
                        returnData.push({
                            json: {
                                success: true,
                                response,
                            },
                        });
                    }
                    
                    // Xử lý lấy danh sách đánh dấu chưa đọc
                    if (operation === 'getUnreadMark') {
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const response = await api.getUnreadMark();
                        
                        returnData.push({
                            json: {
                                success: true,
                                response,
                            },
                        });
                    }
                }
                if (resource === 'zaloTTS') {
                    const ttsCreds = await this.getCredentials('zaloTTSApi');
                    if (!ttsCreds || !ttsCreds.xiApiKey) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo TTS API credentials are not set or invalid. Please create a ZaloTTSApi credential with your API key.');
                    }
                    const apiKey = ttsCreds.xiApiKey;
                    const text = this.getNodeParameter('text', i);
                    const speaker_id = this.getNodeParameter('voice', i);
                    const encode_type = this.getNodeParameter('encode_type', i);
                    const speed = this.getNodeParameter('speed', i);

                    const ttsOptions = {
                        url: 'https://api.zalo.ai/v1/tts/synthesize',
                        method: 'POST',
                        headers: {
                            'apikey': apiKey,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `input=${encodeURIComponent(text)}&speaker_id=${speaker_id}&speed=${speed}&encode_type=${encode_type}`,
                        json: true,
                    };

                    const ttsResponse = await this.helpers.httpRequest(ttsOptions);

                    if (ttsResponse.error || (ttsResponse.error_code && ttsResponse.error_code !== 0)) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Zalo TTS API error: ${ttsResponse.error_message || JSON.stringify(ttsResponse)}`);
                    }

                    if (operation === 'convertTTS') {
                        returnData.push({
                            json: ttsResponse,
                        });
                    } else if (operation === 'sendTTSMessage') {
                        const audioUrl = ttsResponse.data.url;
                        if (!audioUrl) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Failed to get audio URL from Zalo TTS API response.');
                        }

                        const threadId = this.getNodeParameter('threadId', i);
                        const typeNumber = this.getNodeParameter('type', i);
                        const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;

                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API client not initialized. Check your Zalo API credentials.');
                        }

                        const response = await api.sendVoice({ voiceUrl: audioUrl }, threadId, type);

                        returnData.push({
                            json: {
                                success: true,
                                message: 'TTS voice message sent successfully.',
                                response,
                                threadId,
                                threadType: type,
                                ttsUrl: audioUrl,
                            },
                        });
                    }
                }
                if (operation === 'addReaction') {
                    const threadId = this.getNodeParameter('threadId', i);
                    const typeNumber = this.getNodeParameter('type', i);
                    const type = typeNumber === 0 ? zalo_sdk_1.ThreadType.User : zalo_sdk_1.ThreadType.Group;
                    const msgId = this.getNodeParameter('msgId', i);
                    const cliMsgId = this.getNodeParameter('cliMsgId', i);
                    const reaction = this.getNodeParameter('reaction', i);

                    if (!api) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                    }

                    const reactionEnum = zalo_sdk_1.Reactions[reaction];
                    if (reactionEnum === undefined) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid reaction: ${reaction}`);
                    }

                    const dest = {
                        threadId: threadId,
                        type: type,
                        data: {
                            msgId: msgId,
                            cliMsgId: cliMsgId,
                        },
                    };

                    const response = await api.addReaction(reactionEnum, dest);

                    returnData.push({
                        json: {
                            success: true,
                            response,
                        },
                    });
                }
            }            
            catch (error) {
                this.logger.error('Error sending Zalo message:', error);
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            success: false,
                            error: error.message,
                        },
                    });
                }
                else {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), error, { itemIndex: i });
                }
            }
        }
        return [returnData];
    }
}
exports.ZaloSendMessage = ZaloSendMessage;
//# sourceMappingURL=ZaloSendMessage.node.js.map