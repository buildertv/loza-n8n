"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloGroup = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const ZaloGroupDescription_1 = require("./ZaloGroupDescription");
const ZaloPollDescription_1 = require("./ZaloPollDescription");
const zalo_sdk_1 = require("../zalo-sdk");
let api;
class ZaloGroup {
    constructor() {
        this.description = {
            displayName: 'Zalo Group',
            name: 'zaloGroup',
            icon: 'file:../shared/zalo.svg',
            group: ['Zalo'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Quản lý nhóm Zalo',
            defaults: {
                name: 'Zalo Group',
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
                            name: 'Group',
                            value: 'zaloGroup',
                        },
                        {
                            name: 'Poll',
                            value: 'zaloPoll',
                        },
                    ],
                    default: 'zaloGroup',
                },
                ...ZaloGroupDescription_1.zaloGroupOperations,
                ...ZaloGroupDescription_1.zaloGroupFields,
                ...ZaloPollDescription_1.zaloPollOperations,
                ...ZaloPollDescription_1.zaloPollFields,
            ],
        };
    }
    async execute() {
        var _a, _b, _c, _d;
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
                if (resource === 'zaloGroup') {
                    if (operation === 'createGroup') {
                        const groupName = this.getNodeParameter('groupName', i);
                        const userIds = this.getNodeParameter('userIds', i);
                        const userList = userIds.split(',');
                        const response = await api.createGroup({ name: groupName, members: userList });
                        returnData.push({
                            json: response,
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'getGroupInfo') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const response = await api.getGroupInfo(groupId);
                        const groupInfo = response.gridInfoMap[groupId];
                        returnData.push({
                            json: {
                                response: response,
                                groupInfo: groupInfo,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'addGroupDeputy') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const userId = this.getNodeParameter('userId', i);
                        const response = await api.addGroupDeputy(groupId, userId);
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
                    else if (operation === 'addUserToGroup') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const userIds = this.getNodeParameter('userIds', i);
                        const userList = userIds.split(',');
                        const response = await api.addUserToGroup(userList, groupId);
                        returnData.push({
                            json: response,
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'changeGroupAvatar') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const imageUrl = this.getNodeParameter('imageUrl', i);
                        const response = await api.changeGroupAvatar(groupId, imageUrl);
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
                    else if (operation === 'changeGroupName') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const newName = this.getNodeParameter('newName', i);
                        const response = await api.changeGroupName(groupId, newName);
                        returnData.push({
                            json: response,
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'getGroupMembers') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const limit = this.getNodeParameter('limit', i);
                        const response = await api.getGroupInfo(groupId);
                        const groupInfo = response.gridInfoMap[groupId];
                        const members = ((_d = groupInfo.memberIds) === null || _d === void 0 ? void 0 : _d.slice(0, limit)) || [];
                        const admins = groupInfo.adminIds || [];
                        const currentMems = groupInfo.currentMems || [];
                        const updateMems = groupInfo.updateMems || [];
                        const totalMember = groupInfo.totalMember || 0;
                        returnData.push({
                            json: { members, admins, currentMems, updateMems, totalMember },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'getAllGroups') {
                        const response = await api.getAllGroups();
                        returnData.push({
                            json: { response },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'removeUserFromGroup') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const userIds = this.getNodeParameter('userIds', i);
                        const userList = userIds.split(',');
                        const response = await api.removeUserFromGroup(userList, groupId);
                        returnData.push({
                            json: response,
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'createNote') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const content = this.getNodeParameter('content', i);
                        const pinAct = this.getNodeParameter('pinAct', i);
                        const options = {
                            title: content,
                            pinAct: pinAct,
                        };
                        const response = await api.createNote(options, groupId);
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
                    else if (operation === 'changeGroupOwner') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const userId = this.getNodeParameter('userId', i);
                        const response = await api.changeGroupOwner(userId, groupId);
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
                    else if (operation === 'disperseGroup') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const response = await api.disperseGroup(groupId);
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
                    else if (operation === 'getGroupMembersInfo') {
                        const userIds = this.getNodeParameter('userIds', i);
                        const userList = userIds.split(',');
                        const response = await api.getGroupMembersInfo(userList);
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
                    else if (operation === 'getAutoDeleteChat') {
                        try {
                            const response = await api.getAutoDeleteChat();
                            returnData.push({
                                json: {
                                    status: "Thành công",
                                    message: "Lấy danh sách cài đặt tự động xóa thành công",
                                    autoDeleteChats: response,
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
                    else if (operation === 'updateAutoDeleteChat') {
                        const conversationId = this.getNodeParameter('conversationId', i);
                        const autoDeleteTime = this.getNodeParameter('autoDeleteTime', i);
                        const threadType = this.getNodeParameter('threadType', i);
                        
                        // Sử dụng loại thread mà người dùng đã chọn
                        const type = threadType === 'group' ? zalo_sdk_1.ThreadType.Group : zalo_sdk_1.ThreadType.User;
                        const response = await api.updateAutoDeleteChat(autoDeleteTime, conversationId, type);
                        returnData.push({
                            json: {
                                status: "Thành công",
                                message: `Đã cập nhật cài đặt tự động xóa tin nhắn cho ${threadType === 'group' ? 'nhóm' : 'cuộc trò chuyện cá nhân'}`,
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'updateGroupSettings') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const onlyAdminCanAddMember = this.getNodeParameter('onlyAdminCanAddMember', i, false);
                        const onlyAdminCanChangeGroupInfo = this.getNodeParameter('onlyAdminCanChangeGroupInfo', i, false);
                        
                        const settings = {
                            onlyAdminCanAddMember,
                            onlyAdminCanChangeGroupInfo
                        };
                        
                        const response = await api.updateGroupSettings(groupId, settings);
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
                    else if (operation === 'getGroupLinkInfo') {
                        const groupId = this.getNodeParameter('groupId', i);
                        
                        const response = await api.getGroupLinkInfo(groupId);
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
                    else if (operation === 'enableGroupLink') {
                        const groupId = this.getNodeParameter('groupId', i);
                        
                        const response = await api.enableGroupLink(groupId);
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
                    else if (operation === 'disableGroupLink') {
                        const groupId = this.getNodeParameter('groupId', i);
                        
                        const response = await api.disableGroupLink(groupId);
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
                    else if (operation === 'joinGroup') {
                        const groupLink = this.getNodeParameter('groupLink', i);
                        
                        const response = await api.joinGroup(groupLink);
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
                    else if (operation === 'leaveGroup') {
                        const groupId = this.getNodeParameter('groupId', i);
                        
                        const response = await api.leaveGroup(groupId);
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
                    else if (operation === 'inviteUserToGroups') {
                        const userId = this.getNodeParameter('userId', i);
                        const groupIds = this.getNodeParameter('groupIds', i);
                        const groupList = groupIds.split(',');
                        
                        const response = await api.inviteUserToGroups(userId, groupList);
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
                    else if (operation === 'createReminder') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const title = this.getNodeParameter('title', i);
                        const content = this.getNodeParameter('content', i, '');
                        const timestamp = this.getNodeParameter('timestamp', i);
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const reminderData = {
                            groupId: groupId,
                            title: title,
                            content: content,
                            timestamp: timestamp
                        };
                        
                        const response = await api.createReminder(reminderData);
                        returnData.push({
                            json: {
                                success: true,
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'editReminder') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const reminderId = this.getNodeParameter('reminderId', i);
                        const title = this.getNodeParameter('title', i, undefined);
                        const content = this.getNodeParameter('content', i, undefined);
                        const timestamp = this.getNodeParameter('timestamp', i, undefined);
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const reminderData = {
                            groupId: groupId,
                            reminderId: reminderId
                        };
                        
                        // Chỉ thêm các trường được cung cấp
                        if (title !== undefined) reminderData.title = title;
                        if (content !== undefined) reminderData.content = content;
                        if (timestamp !== undefined) reminderData.timestamp = timestamp;
                        
                        const response = await api.editReminder(reminderData);
                        returnData.push({
                            json: {
                                success: true,
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'removeReminder') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const reminderId = this.getNodeParameter('reminderId', i);
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const response = await api.removeReminder({
                            groupId: groupId,
                            reminderId: reminderId
                        });
                        
                        returnData.push({
                            json: {
                                success: true,
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'getListReminder') {
                        const groupId = this.getNodeParameter('groupId', i);
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const response = await api.getListReminder(groupId);
                        returnData.push({
                            json: {
                                success: true,
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'getReminder') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const reminderId = this.getNodeParameter('reminderId', i);
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const response = await api.getReminder({
                            groupId: groupId,
                            reminderId: reminderId
                        });
                        
                        returnData.push({
                            json: {
                                success: true,
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                    else if (operation === 'getReminderResponses') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const reminderId = this.getNodeParameter('reminderId', i);
                        
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized');
                        }
                        
                        const response = await api.getReminderResponses({
                            groupId: groupId,
                            reminderId: reminderId
                        });
                        
                        returnData.push({
                            json: {
                                success: true,
                                response: response,
                            },
                            pairedItem: {
                                item: i,
                            },
                        });
                    }
                }
                else if (resource === 'zaloPoll') {
                    if (operation === 'createPoll') {
                        const groupId = this.getNodeParameter('groupId', i);
                        const question = this.getNodeParameter('question', i);
                        const optionInputType = this.getNodeParameter('optionInputType', i, 'list');
                        let options = [];
                        if (optionInputType === 'list') {
                            try {
                                const pollOptionsCollection = this.getNodeParameter('pollOptionsCollection', i, { options: [] });
                                if ((pollOptionsCollection === null || pollOptionsCollection === void 0 ? void 0 : pollOptionsCollection.options) && Array.isArray(pollOptionsCollection.options)) {
                                    options = pollOptionsCollection.options
                                        .map(item => ((item === null || item === void 0 ? void 0 : item.option) || '').trim())
                                        .filter(option => option !== '');
                                }
                            }
                            catch (error) {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Lỗi xử lý các lựa chọn: ' + (error.message || 'Lỗi không xác định'));
                            }
                        }
                        else if (optionInputType === 'text') {
                            const optionsString = this.getNodeParameter('optionsString', i, '');
                            if (optionsString && optionsString.trim() !== '') {
                                options = optionsString.split(',')
                                    .map(option => option.trim())
                                    .filter(option => option !== '');
                            }
                        }
                        if (!options || options.length === 0) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Vui lòng nhập ít nhất một lựa chọn cho bình chọn', { itemIndex: i });
                        }
                        const expiredTime = this.getNodeParameter('expiredTime', i, null) !== null ? new Date(this.getNodeParameter('expiredTime', i)).getTime() || 0 : 0;
                        const pinAct = this.getNodeParameter('pinAct', i, false);
                        const allowMultiChoices = this.getNodeParameter('allowMultiChoices', i, true);
                        const allowAddNewOption = this.getNodeParameter('allowAddNewOption', i, true);
                        const hideVotePreview = this.getNodeParameter('hideVotePreview', i, false);
                        const isAnonymous = this.getNodeParameter('isAnonymous', i, false);
                        const createPollData = {
                            question: question,
                            options: options,
                            expiredTime: expiredTime,
                            pinAct: pinAct,
                            allowMultiChoices: allowMultiChoices,
                            allowAddNewOption: allowAddNewOption,
                            hideVotePreview: hideVotePreview,
                            isAnonymous: isAnonymous
                        };
                        this.logger.info(`Create poll with parameters: ${JSON.stringify(createPollData)}`);
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized', { itemIndex: i });
                        }
                        const response = await api.createPoll(createPollData, groupId);
                        this.logger.info('Create poll successfully', { groupId, question });
                        returnData.push({
                            json: {
                                success: true,
                                response,
                                groupId,
                                createPollData,
                            },
                        });
                    }
                    else if (operation === 'getPoll') {
                        const poll_id = this.getNodeParameter('poll_id', i);
                        this.logger.info(`Get poll with parameters: ${JSON.stringify(poll_id)}`);
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized', { itemIndex: i });
                        }
                        const response = await api.getPollDetail(poll_id);
                        this.logger.info('Get poll successfully', { response });
                        returnData.push({
                            json: {
                                success: true,
                                response,
                                poll_id,
                            },
                        });
                    }
                    else if (operation === 'lockPoll') {
                        const poll_id = this.getNodeParameter('poll_id', i);
                        this.logger.info(`Lock poll with parameters: ${JSON.stringify(poll_id)}`);
                        if (!api) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Zalo API not initialized', { itemIndex: i });
                        }
                        const response = await api.lockPoll(poll_id);
                        this.logger.info('Lock poll successfully', { response });
                        returnData.push({
                            json: {
                                success: true,
                                response,
                                poll_id,
                            },
                        });
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray({ error: error.message }), { itemData: { item: i } });
                    returnData.push(...executionData);
                    continue;
                }
                throw error;
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
exports.ZaloGroup = ZaloGroup;
//# sourceMappingURL=ZaloGroup.node.js.map