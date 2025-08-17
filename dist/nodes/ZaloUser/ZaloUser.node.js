"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloUser = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const ZaloUserDescription_1 = require("./ZaloUserDescription");
const zalo_sdk_1 = require("../zalo-sdk");
let api;
class ZaloUser {
    constructor() {
        this.description = {
            displayName: 'Zalo User',
            name: 'zaloUser',
            icon: 'file:../shared/zalo.svg',
            group: ['Zalo'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Quản lý người dùng Zalo',
            defaults: {
                name: 'Zalo User',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'zaloApi',
                    required: true,
                    displayName: 'Zalo Credential to connect with',
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
                            name: 'User',
                            value: 'zaloUser',
                        },
                        {
                            name: 'Tag',
                            value: 'zaloTag',
                        },
                    ],
                    default: 'zaloUser',
                },
                ...ZaloUserDescription_1.zaloUserOperations,
                ...ZaloUserDescription_1.zaloUserFields,
                ...ZaloUserDescription_1.zaloTagOperations,
                ...ZaloUserDescription_1.zaloTagFields,
            ],
        };
    }
    async execute() {
        var _a, _b, _c;
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        const zaloCred = await this.getCredentials('zaloApi');
        const cookieFromCred = JSON.parse(zaloCred.cookie);
        const imeiFromCred = zaloCred.imei;
        const userAgentFromCred = zaloCred.userAgent;
        const cookie = cookieFromCred !== null && cookieFromCred !== void 0 ? cookieFromCred : (_a = items.find((x) => x.json.cookie)) === null || _a === void 0 ? void 0 : _a.json.cookie;
        const imei = imeiFromCred !== null && imeiFromCred !== void 0 ? imeiFromCred : (_b = items.find((x) => x.json.imei)) === null || _b === void 0 ? void 0 : _b.json.imei;
        const userAgent = userAgentFromCred !== null && userAgentFromCred !== void 0 ? userAgentFromCred : (_c = items.find((x) => x.json.userAgent)) === null || _c === void 0 ? void 0 : _c.json.userAgent;
        const zalo = new zalo_sdk_1.Zalo();
        const _api = await zalo.login({ cookie, imei, userAgent });
        api = _api;
        if (!api) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'No API instance found. Please make sure to provide valid credentials.');
        }
        for (let i = 0; i < items.length; i++) {
            try {
                if (resource === 'zaloUser') {
                    if (operation === 'acceptFriendRequest') {
                        const userId = this.getNodeParameter('userId', i);
                        const response = await api.acceptFriendRequest(userId);
                        returnData.push({
                            json: {
                                status: "Thành công",
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'sendFriendRequest') {
                        const userId = this.getNodeParameter('userId', i);
                        const message = this.getNodeParameter('message', i);
                        const response = await api.sendFriendRequest(message, userId);
                        returnData.push({
                            json: {
                                status: "Thành công",
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'blockUser') {
                        const userId = this.getNodeParameter('userId', i);
                        const response = await api.blockUser(userId);
                        returnData.push({
                            json: {
                                status: "Thành công",
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'unblockUser') {
                        const userId = this.getNodeParameter('userId', i);
                        const response = await api.unblockUser(userId);
                        returnData.push({
                            json: {
                                status: "Thành công",
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'changeAccountSetting') {
                        const name = this.getNodeParameter('name', i);
                        const dob = this.getNodeParameter('dob', i);
                        const gender = this.getNodeParameter('gender', i);
                        const response = await api.updateProfile(name, dob, gender);
                        returnData.push({
                            json: {
                                status: "Thành công",
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'getUserInfo') {
                        const userId = this.getNodeParameter('userId', i);
                        const response = await api.getUserInfo(userId);
                        returnData.push({
                            json: response,
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'getAllFriends') {
                        const limit = this.getNodeParameter('limit', i);
                        const response = await api.getAllFriends();
                        const friends = response.slice(0, limit) || [];
                        returnData.push({
                            json: {
                                friends: friends,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'findUser') {
                        const phoneNumber = this.getNodeParameter('phoneNumber', i);
                        const response = await api.findUser(phoneNumber);
                        returnData.push({
                            json: response,
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'changeAliasName') {
                        const userId = this.getNodeParameter('userId', i);
                        const aliasName = this.getNodeParameter('aliasName', i);
                        const response = await api.changeFriendAlias(aliasName, userId);
                        returnData.push({
                            json: {
                                status: "Thành công",
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'undoMessage') {
                        const threadId = this.getNodeParameter('threadId', i);
                        const type = this.getNodeParameter('threadType', i);
                        const msgId = this.getNodeParameter('msgId', i);
                        const cliMsgId = this.getNodeParameter('cliMsgId', i);
                        const UndoOptions = {
                            msgId: msgId,
                            cliMsgId: cliMsgId
                        };
                        const response = await api.undo(UndoOptions, threadId, type);
                        returnData.push({
                            json: {
                                status: "Thành công",
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'deleteMessage') {
                        const threadId = this.getNodeParameter('threadId', i);
                        const type = this.getNodeParameter('threadType', i);
                        const msgId = this.getNodeParameter('msgId', i);
                        const cliMsgId = this.getNodeParameter('cliMsgId', i);
                        const onlyMe = this.getNodeParameter('onlyMe', i);
                        const uidFrom = this.getNodeParameter('uidFrom', i);
                        
                        const deleteOptions = {
                            msgId: msgId,
                            cliMsgId: cliMsgId,
                            uidFrom: uidFrom,
                            onlyMe: onlyMe
                        };
                        
                        try {
                            const response = await api.deleteMessage(deleteOptions, threadId, type);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            // Check if this is the specific error about using undo instead
                            if (error.message && error.message.includes("use undo api instead")) {
                                returnData.push({
                                    json: {
                                        status: "Lỗi",
                                        error: error.message,
                                        hint: "Hãy sử dụng tính năng 'Thu hồi tin nhắn' thay vì 'Xóa tin nhắn' để xóa tin nhắn của chính bạn cho tất cả mọi người."
                                    },
                                    pairedItem: {
                                        item: i,
                                    },
                                });
                            } else {
                                // Re-throw other errors
                                throw error;
                            }
                        }
                    }
                    else if (operation === 'blockViewFeed') {
                        const userId = this.getNodeParameter('userId', i);
                        const isBlockFeed = this.getNodeParameter('isBlockFeed', i);
                        
                        try {
                            const response = await api.blockViewFeed(userId, isBlockFeed);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    action: isBlockFeed ? "Đã chặn xem bài viết" : "Đã bỏ chặn xem bài viết",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    // Quản lý avatar
                    else if (operation === 'changeAccountAvatar') {
                        const avatarUrl = this.getNodeParameter('avatarUrl', i);
                        try {
                            const response = await api.changeAccountAvatar(avatarUrl);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'getAvatarList') {
                        try {
                            const response = await api.getAvatarList();
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    avatars: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'deleteAvatar') {
                        const avatarId = this.getNodeParameter('avatarId', i);
                        try {
                            const response = await api.deleteAvatar(avatarId);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'reuseAvatar') {
                        const avatarId = this.getNodeParameter('avatarId', i);
                        try {
                            const response = await api.reuseAvatar(avatarId);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    // Quản lý cài đặt người dùng
                    else if (operation === 'updateSettings') {
                        const settings = JSON.parse(this.getNodeParameter('settings', i));
                        try {
                            const response = await api.updateSettings(settings);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'updateProfile') {
                        const profileData = JSON.parse(this.getNodeParameter('profileData', i));
                        try {
                            const response = await api.updateProfile(profileData.name, profileData.dob, profileData.gender);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'updateLang') {
                        const langCode = this.getNodeParameter('langCode', i);
                        try {
                            const response = await api.updateLang(langCode);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    // Quản lý nhãn và cuộc trò chuyện
                    else if (operation === 'getLabels') {
                        try {
                            const response = await api.getLabels();
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    labels: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'updateLabels') {
                        const labelData = JSON.parse(this.getNodeParameter('labelData', i));
                        try {
                            const response = await api.updateLabels(labelData);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'setMute') {
                        const threadId = this.getNodeParameter('threadId', i);
                        const threadType = this.getNodeParameter('threadType', i);
                        const muteStatus = this.getNodeParameter('muteStatus', i);
                        try {
                            const response = await api.setMute(threadId, threadType, muteStatus);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'getMute') {
                        try {
                            const response = await api.getMute();
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    mutedConversations: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'setPinnedConversations') {
                        const threadId = this.getNodeParameter('threadId', i);
                        const threadType = this.getNodeParameter('threadType', i);
                        const pinStatus = this.getNodeParameter('pinStatus', i);
                        try {
                            const response = await api.setPinnedConversations(threadId, threadType, pinStatus);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'getPinConversations') {
                        try {
                            const response = await api.getPinConversations();
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    pinnedConversations: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'setHiddenConversations') {
                        const threadId = this.getNodeParameter('threadId', i);
                        const threadType = this.getNodeParameter('threadType', i);
                        const hiddenStatus = this.getNodeParameter('hiddenStatus', i);
                        try {
                            const response = await api.setHiddenConversations(threadId, threadType, hiddenStatus);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'getHiddenConversations') {
                        try {
                            const response = await api.getHiddenConversations();
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    hiddenConversations: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'updateHiddenConversPin') {
                        const threadId = this.getNodeParameter('threadId', i);
                        const pinCode = this.getNodeParameter('pinCode', i);
                        try {
                            const response = await api.updateHiddenConversPin(threadId, pinCode);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'resetHiddenConversPin') {
                        const threadId = this.getNodeParameter('threadId', i);
                        try {
                            const response = await api.resetHiddenConversPin(threadId);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    // Quản lý lời mời kết bạn
                    else if (operation === 'getReceivedFriendRequests') {
                        try {
                            const response = await api.getReceivedFriendRequests();
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    friendRequests: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'getSentFriendRequest') {
                        try {
                            const response = await api.getSentFriendRequest();
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    sentRequests: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'undoFriendRequest') {
                        const userId = this.getNodeParameter('userId', i);
                        try {
                            const response = await api.undoFriendRequest(userId);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    // Chức năng getAutoDeleteChat và updateAutoDeleteChat đã được di chuyển sang ZaloGroup để tránh trùng lắp
                    // Báo cáo và thông tin khác
                    else if (operation === 'sendReport') {
                        const reportType = this.getNodeParameter('reportType', i);
                        const reason = this.getNodeParameter('reason', i);
                        const contentId = this.getNodeParameter('contentId', i, '');
                        try {
                            const response = await api.sendReport(reportType, reason, contentId);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    response: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'lastOnline') {
                        const userId = this.getNodeParameter('userId', i);
                        try {
                            const response = await api.lastOnline(userId);
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    lastOnline: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                    else if (operation === 'fetchAccountInfo') {
                        try {
                            const response = await api.fetchAccountInfo();
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    accountInfo: response,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        } catch (error) {
                            returnData.push({
                                json: {
                                    status: "Lỗi",
                                    error: error.message,
                                },
                                pairedItem: {
                                    item: i,
                                },
                            });
                        }
                    }
                }
                else if (resource === 'zaloTag') {
                    if (operation === 'getAll') {
                        const response = await api.getLabels();
                        returnData.push({
                            json: { success: true, labels: response },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error.message,
                        },
                        pairedItem: {
                            item: i,
                        },
                    });
                    continue;
                }
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), error, {
                    itemIndex: i,
                });
            }
        }
        return [returnData];
    }
}
exports.ZaloUser = ZaloUser;
//# sourceMappingURL=ZaloUser.node.js.map
