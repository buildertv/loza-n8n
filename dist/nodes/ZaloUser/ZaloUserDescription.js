"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zaloTagFields = exports.zaloTagOperations = exports.zaloUserFields = exports.zaloUserOperations = void 0;
exports.zaloUserOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
            },
        },
        options: [
            {
                name: 'Chấp nhận lời mời kết bạn',
                value: 'acceptFriendRequest',
                action: 'Chấp nhận lời mời kết bạn',
            },
            {
                name: 'Gửi lời mời kết bạn',
                value: 'sendFriendRequest',
                description: 'Gửi lời mời kết bạn',
                action: 'Gửi lời mời kết bạn',
            },
            {
                name: 'Chặn người dùng',
                value: 'blockUser',
                description: 'Chặn người dùng',
                action: 'Chặn người dùng',
            },
            {
                name: 'Bỏ chặn người dùng',
                value: 'unblockUser',
                description: 'Bỏ chặn người dùng',
                action: 'Bỏ chặn người dùng',
            },
            {
                name: 'Thay đổi cài đặt tài khoản',
                value: 'changeAccountSetting',
                description: 'Thay đổi cài đặt tài khoản',
                action: 'Thay đổi cài đặt tài khoản',
            },
            {
                name: 'Lấy thông tin người dùng',
                value: 'getUserInfo',
                description: 'Lấy thông tin người dùng',
                action: 'Lấy thông tin người dùng',
            },
            {
                name: 'Lấy danh sách bạn bè',
                value: 'getAllFriends',
                description: 'Lấy danh sách bạn bè',
                action: 'Lấy danh sách bạn bè',
            },
            {
                name: 'Tìm kiếm người dùng',
                value: 'findUser',
                description: 'Tìm kiếm người dùng',
                action: 'Tìm kiếm người dùng',
            },
            {
                name: 'Đổi tên gợi nhớ',
                value: 'changeAliasName',
                description: 'Đổi tên gợi nhớ của bạn bè',
                action: 'Đổi tên gợi nhớ',
            },
            {
                name: 'Thu hồi tin nhắn',
                value: 'undoMessage',
                description: 'Thu hồi tin nhắn đã gửi',
                action: 'Thu hồi tin nhắn đã gửi',
            },
            {
                name: 'Xóa tin nhắn',
                value: 'deleteMessage',
                description: 'Xóa tin nhắn',
                action: 'Xóa tin nhắn',
            },
            {
                name: 'Chặn/Bỏ chặn xem bài viết',
                value: 'blockViewFeed',
                description: 'Chặn hoặc bỏ chặn xem bài viết của bạn bè',
                action: 'Chặn/Bỏ chặn xem bài viết',
            },
            {
                name: 'Thay đổi ảnh đại diện',
                value: 'changeAccountAvatar',
                description: 'Thay đổi ảnh đại diện tài khoản',
                action: 'Thay đổi ảnh đại diện',
            },
            {
                name: 'Lấy danh sách avatar',
                value: 'getAvatarList',
                description: 'Lấy danh sách avatar đã sử dụng',
                action: 'Lấy danh sách avatar',
            },
            {
                name: 'Xóa avatar',
                value: 'deleteAvatar',
                description: 'Xóa avatar',
                action: 'Xóa avatar',
            },
            {
                name: 'Sử dụng lại avatar cũ',
                value: 'reuseAvatar',
                description: 'Sử dụng lại avatar cũ',
                action: 'Sử dụng lại avatar cũ',
            },
            {
                name: 'Cập nhật cài đặt người dùng',
                value: 'updateSettings',
                description: 'Cập nhật cài đặt người dùng',
                action: 'Cập nhật cài đặt người dùng',
            },
            {
                name: 'Cập nhật thông tin cá nhân',
                value: 'updateProfile',
                description: 'Cập nhật thông tin cá nhân',
                action: 'Cập nhật thông tin cá nhân',
            },
            {
                name: 'Thay đổi ngôn ngữ',
                value: 'updateLang',
                description: 'Thay đổi ngôn ngữ',
                action: 'Thay đổi ngôn ngữ',
            },
            {
                name: 'Lấy danh sách nhãn',
                value: 'getLabels',
                description: 'Lấy danh sách nhãn',
                action: 'Lấy danh sách nhãn',
            },
            {
                name: 'Cập nhật nhãn',
                value: 'updateLabels',
                description: 'Cập nhật nhãn',
                action: 'Cập nhật nhãn',
            },
            {
                name: 'Tắt thông báo cuộc trò chuyện',
                value: 'setMute',
                description: 'Tắt thông báo cho cuộc trò chuyện',
                action: 'Tắt thông báo cuộc trò chuyện',
            },
            {
                name: 'Lấy danh sách cuộc trò chuyện đã tắt thông báo',
                value: 'getMute',
                description: 'Lấy danh sách cuộc trò chuyện đã tắt thông báo',
                action: 'Lấy danh sách cuộc trò chuyện đã tắt thông báo',
            },
            {
                name: 'Ghim/Bỏ ghim cuộc trò chuyện',
                value: 'setPinnedConversations',
                description: 'Ghim hoặc bỏ ghim một cuộc trò chuyện',
                action: 'Ghim/Bỏ ghim cuộc trò chuyện',
            },
            {
                name: 'Lấy danh sách cuộc trò chuyện đã ghim',
                value: 'getPinConversations',
                description: 'Lấy danh sách cuộc trò chuyện đã ghim',
                action: 'Lấy danh sách cuộc trò chuyện đã ghim',
            },
            {
                name: 'Ẩn cuộc trò chuyện',
                value: 'setHiddenConversations',
                description: 'Ẩn cuộc trò chuyện',
                action: 'Ẩn cuộc trò chuyện',
            },
            {
                name: 'Lấy danh sách cuộc trò chuyện đã ẩn',
                value: 'getHiddenConversations',
                description: 'Lấy danh sách cuộc trò chuyện đã ẩn',
                action: 'Lấy danh sách cuộc trò chuyện đã ẩn',
            },
            {
                name: 'Cập nhật mã PIN cho cuộc trò chuyện ẩn',
                value: 'updateHiddenConversPin',
                description: 'Cập nhật mã PIN cho cuộc trò chuyện ẩn',
                action: 'Cập nhật mã PIN cho cuộc trò chuyện ẩn',
            },
            {
                name: 'Đặt lại mã PIN cho cuộc trò chuyện ẩn',
                value: 'resetHiddenConversPin',
                description: 'Đặt lại mã PIN cho cuộc trò chuyện ẩn',
                action: 'Đặt lại mã PIN cho cuộc trò chuyện ẩn',
            },
            {
                name: 'Lấy danh sách lời mời kết bạn đã nhận',
                value: 'getReceivedFriendRequests',
                description: 'Lấy danh sách lời mời kết bạn đã nhận',
                action: 'Lấy danh sách lời mời kết bạn đã nhận',
            },
            {
                name: 'Lấy danh sách lời mời kết bạn đã gửi',
                value: 'getSentFriendRequest',
                description: 'Lấy danh sách lời mời kết bạn đã gửi',
                action: 'Lấy danh sách lời mời kết bạn đã gửi',
            },
            {
                name: 'Hủy lời mời kết bạn đã gửi',
                value: 'undoFriendRequest',
                description: 'Hủy lời mời kết bạn đã gửi',
                action: 'Hủy lời mời kết bạn đã gửi',
            },
            // Chức năng getAutoDeleteChat và updateAutoDeleteChat đã được di chuyển sang ZaloGroup để tránh trùng lắp
            {
                name: 'Gửi báo cáo',
                value: 'sendReport',
                description: 'Gửi báo cáo về người dùng hoặc nội dung',
                action: 'Gửi báo cáo',
            },
            {
                name: 'Xem thời gian hoạt động gần nhất',
                value: 'lastOnline',
                description: 'Xem thời gian hoạt động gần nhất của người dùng',
                action: 'Xem thời gian hoạt động gần nhất',
            },
            {
                name: 'Lấy thông tin tài khoản',
                value: 'fetchAccountInfo',
                description: 'Lấy thông tin chi tiết về tài khoản của bạn',
                action: 'Lấy thông tin tài khoản',
            },
        ],
        default: 'getUserInfo',
    },
];

exports.zaloTagOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: ['zaloTag'],
            },
        },
        options: [
            {
                name: 'Get All Tags',
                value: 'getAll',
                description: 'Lấy danh sách tất cả các thẻ',
                action: 'Get all tags',
            },
        ],
        default: 'getAll',
    },
];

exports.zaloUserFields = [
    {
        displayName: 'Thread ID',
        name: 'threadId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['undoMessage'],
            },
        },
        default: '',
        description: 'ID của người dùng cần thu hồi tin nhắn',
    },
    {
        displayName: 'Loại cuộc trò chuyện',
        name: 'threadType',
        type: 'options',
        options: [
            { name: 'Cá nhân', value: 0 },
            { name: 'Nhóm', value: 1 },
        ],
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['undoMessage'],
            },
        },
        default: 0,
        description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
    },
    {
        displayName: 'msgId',
        name: 'msgId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['undoMessage'],
            },
        },
        default: '',
        description: 'Message ID',
    },
    {
        displayName: 'cliMsgId',
        name: 'cliMsgId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['undoMessage'],
            },
        },
        default: '',
        description: 'Client message ID',
    },
    {
        displayName: 'User ID',
        name: 'userId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['changeAliasName', 'acceptFriendRequest', 'sendFriendRequest', 'blockUser', 'unblockUser', 'getUserInfo', 'blockViewFeed'],
            },
        },
        default: '',
        description: 'ID của người dùng',
    },
    {
        displayName: 'Alias Name',
        name: 'aliasName',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['changeAliasName'],
            },
        },
        default: '',
        description: 'Tên gợi nhớ mới',
    },
    {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['sendFriendRequest'],
            },
        },
        default: '',
        description: 'Tin nhắn kèm theo lời mời kết bạn',
    },
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['changeAccountSetting'],
            },
        },
        default: '',
        description: 'Tên hiển thị',
    },
    {
        displayName: 'Date of Birth',
        name: 'dob',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['changeAccountSetting'],
            },
        },
        default: '',
        description: 'Ngày sinh (YYYY-MM-DD)',
    },
    {
        displayName: 'Gender',
        name: 'gender',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['changeAccountSetting'],
            },
        },
        options: [
            {
                name: 'Male',
                value: 1,
            },
            {
                name: 'Female',
                value: 2,
            },
            {
                name: 'Other',
                value: 3,
            },
        ],
        default: 1,
        description: 'Giới tính',
    },
    {
        displayName: 'Language',
        name: 'language',
        type: 'string',
        required: false,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['changeAccountSetting'],
            },
        },
        default: '',
        description: 'Ngôn ngữ (vi, en)',
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['getAllFriends', 'findUser'],
            },
        },
        default: 50,
        description: 'Số lượng kết quả tối đa',
    },
    {
        displayName: 'Phone Number',
        name: 'phoneNumber',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['findUser'],
            },
        },
        default: '',
        description: 'Số điện thoại cần tìm kiếm',
    },
    {
        displayName: 'Thread ID',
        name: 'threadId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['deleteMessage'],
            },
        },
        default: '',
        description: 'ID của người dùng hoặc nhóm cần xóa tin nhắn',
    },
    {
        displayName: 'Loại cuộc trò chuyện',
        name: 'threadType',
        type: 'options',
        options: [
            { name: 'Cá nhân', value: 0 },
            { name: 'Nhóm', value: 1 },
        ],
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['deleteMessage'],
            },
        },
        default: 0,
        description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
    },
    {
        displayName: 'Message ID',
        name: 'msgId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['deleteMessage'],
            },
        },
        default: '',
        description: 'ID của tin nhắn cần xóa',
    },
    {
        displayName: 'Client Message ID',
        name: 'cliMsgId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['deleteMessage'],
            },
        },
        default: '',
        description: 'Client message ID của tin nhắn cần xóa',
    },
    {
        displayName: 'Only Me',
        name: 'onlyMe',
        type: 'boolean',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['deleteMessage'],
            },
        },
        default: true,
        description: 'Chỉ xóa tin nhắn cho bản thân (true) hoặc cho tất cả (false). Lưu ý: Nếu bạn muốn xóa tin nhắn của chính mình cho tất cả mọi người, hãy sử dụng tính năng "Thu hồi tin nhắn" thay vì đặt onlyMe = false',
    },
    {
        displayName: 'User ID From',
        name: 'uidFrom',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['deleteMessage'],
            },
        },
        default: '',
        description: 'ID của người gửi tin nhắn',
    },
];

exports.zaloTagFields = [];

// Block View Feed Fields
exports.zaloUserFields.push(
    {
        displayName: 'Block View Feed',
        name: 'isBlockFeed',
        type: 'boolean',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['blockViewFeed'],
            },
        },
        default: true,
        description: 'Chặn (true) hoặc bỏ chặn (false) xem bài viết',
    }
);

// Avatar Fields
exports.zaloUserFields.push(
    {
        displayName: 'Avatar URL',
        name: 'avatarUrl',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['changeAccountAvatar'],
            },
        },
        default: '',
        description: 'URL của ảnh đại diện mới',
    },
    {
        displayName: 'Avatar ID',
        name: 'avatarId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['deleteAvatar', 'reuseAvatar'],
            },
        },
        default: '',
        description: 'ID của avatar cần xóa hoặc sử dụng lại',
    }
);

// User Settings Fields
exports.zaloUserFields.push(
    {
        displayName: 'Settings',
        name: 'settings',
        type: 'json',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['updateSettings'],
            },
        },
        default: '{}',
        description: 'Cài đặt người dùng dạng JSON',
    },
    {
        displayName: 'Profile Data',
        name: 'profileData',
        type: 'json',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['updateProfile'],
            },
        },
        default: '{}',
        description: 'Thông tin cá nhân dạng JSON',
    },
    {
        displayName: 'Language Code',
        name: 'langCode',
        type: 'options',
        options: [
            { name: 'Tiếng Việt', value: 'vi' },
            { name: 'English', value: 'en' },
        ],
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['updateLang'],
            },
        },
        default: 'vi',
        description: 'Mã ngôn ngữ',
    }
);

// Conversation Management Fields
exports.zaloUserFields.push(
    {
        displayName: 'Thread ID',
        name: 'threadId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['setMute', 'setPinnedConversations', 'setHiddenConversations', 'updateHiddenConversPin', 'resetHiddenConversPin', 'updateAutoDeleteChat'],
            },
        },
        default: '',
        description: 'ID của cuộc trò chuyện',
    },
    {
        displayName: 'Thread Type',
        name: 'threadType',
        type: 'options',
        options: [
            { name: 'Cá nhân', value: 0 },
            { name: 'Nhóm', value: 1 },
        ],
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['setMute', 'setPinnedConversations', 'setHiddenConversations', 'updateAutoDeleteChat'],
            },
        },
        default: 0,
        description: 'Loại cuộc trò chuyện',
    },
    {
        displayName: 'Mute Status',
        name: 'muteStatus',
        type: 'boolean',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['setMute'],
            },
        },
        default: true,
        description: 'Tắt thông báo (true) hoặc bật thông báo (false)',
    },
    {
        displayName: 'Pin Status',
        name: 'pinStatus',
        type: 'boolean',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['setPinnedConversations'],
            },
        },
        default: true,
        description: 'Ghim (true) hoặc bỏ ghim (false) cuộc trò chuyện',
    },
    {
        displayName: 'Hidden Status',
        name: 'hiddenStatus',
        type: 'boolean',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['setHiddenConversations'],
            },
        },
        default: true,
        description: 'Ẩn (true) hoặc hiện (false) cuộc trò chuyện',
    },
    {
        displayName: 'PIN Code',
        name: 'pinCode',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['updateHiddenConversPin'],
            },
        },
        default: '',
        description: 'Mã PIN mới cho cuộc trò chuyện ẩn',
    },
    {
        displayName: 'Auto Delete Duration (hours)',
        name: 'duration',
        type: 'options',
        options: [
            { name: 'Tắt tự động xóa', value: 0 },
            { name: '1 giờ', value: 1 },
            { name: '24 giờ', value: 24 },
            { name: '7 ngày', value: 168 },
        ],
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['updateAutoDeleteChat'],
            },
        },
        default: 0,
        description: 'Thời gian tự động xóa tin nhắn',
    }
);

// Labels Fields
exports.zaloUserFields.push(
    {
        displayName: 'Label Data',
        name: 'labelData',
        type: 'json',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['updateLabels'],
            },
        },
        default: '[]',
        description: 'Dữ liệu nhãn dạng JSON array',
    }
);

// Report Fields
exports.zaloUserFields.push(
    {
        displayName: 'Report Type',
        name: 'reportType',
        type: 'options',
        options: [
            { name: 'Người dùng', value: 'user' },
            { name: 'Nội dung', value: 'content' },
            { name: 'Nhóm', value: 'group' },
        ],
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['sendReport'],
            },
        },
        default: 'user',
        description: 'Loại báo cáo',
    },
    {
        displayName: 'Report Reason',
        name: 'reason',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['sendReport'],
            },
        },
        default: '',
        description: 'Lý do báo cáo',
    },
    {
        displayName: 'Content ID',
        name: 'contentId',
        type: 'string',
        required: false,
        displayOptions: {
            show: {
                resource: ['zaloUser'],
                operation: ['sendReport'],
            },
        },
        default: '',
        description: 'ID của nội dung cần báo cáo (nếu reportType là content)',
    }
);
//# sourceMappingURL=ZaloUserDescription.js.map