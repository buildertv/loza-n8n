"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zaloSendMessageFields = exports.zaloSendMessageOperations = void 0;
exports.zaloSendMessageOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
            },
        },
        options: [
            {
                name: 'Gửi tin nhắn',
                value: 'sendMessage',
                description: 'Gửi tin nhắn',
                action: 'Gửi tin nhắn',
            },
            {
                name: 'Gửi trạng thái tin nhắn',
                value: 'sendMessageStatus',
                description: 'Gửi trạng thái tin nhắn',
                action: 'Gửi trạng thái tin nhắn',
            },
            {
                name: 'Lấy danh sách sticker',
                value: 'getStickers',
                description: 'Lấy danh sách sticker / Get sticker list',
                action: 'Lấy danh sách sticker',
            },
            {
                name: 'Lấy chi tiết sticker',
                value: 'getStickersDetail',
                description: 'Lấy chi tiết sticker / Get sticker detail',
                action: 'Lấy chi tiết sticker',
            },
            {
                name: 'Gửi sticker',
                value: 'sendSticker',
                description: 'Gửi sticker vào cuộc trò chuyện',
                action: 'Gửi sticker',
            },
            {
                name: 'Thả Reaction',
                value: 'addReaction',
                description: 'Thả reaction vào một tin nhắn',
                action: 'Thả reaction vào một tin nhắn',
            },
			{
				name: 'Gửi tin nhắn thoại',
				value: 'sendVoice',
				description: 'Gửi một tin nhắn thoại từ URL',
				action: 'Gửi tin nhắn thoại',
			},
			{
				name: 'Gửi danh thiếp',
				value: 'sendCard',
				description: 'Gửi danh thiếp của một người dùng',
				action: 'Gửi danh thiếp',
			},
			// Đã di chuyển chức năng ghim hội thoại sang ZaloUser để tránh trùng lắp
			{
				name: 'Gửi Video',
				value: 'sendVideo',
				description: 'Gửi một tin nhắn video',
				action: 'Gửi video',
			},
			{
				name: 'Gửi Link',
				value: 'sendLink',
				description: 'Gửi tin nhắn dạng link',
				action: 'Gửi link',
			},
			{
				name: 'Chuyển Tiếp Tin Nhắn',
				value: 'forwardMessage',
				description: 'Chuyển tiếp tin nhắn đến người dùng hoặc nhóm khác',
				action: 'Chuyển tiếp tin nhắn',
			},
			{
				name: 'Thêm Tin Nhắn Nhanh',
				value: 'addQuickMessage',
				description: 'Thêm tin nhắn nhanh',
				action: 'Thêm tin nhắn nhanh',
			},
			{
				name: 'Lấy Danh Sách Tin Nhắn Nhanh',
				value: 'getQuickMessage',
				description: 'Lấy danh sách tin nhắn nhanh',
				action: 'Lấy danh sách tin nhắn nhanh',
			},
			{
				name: 'Cập Nhật Tin Nhắn Nhanh',
				value: 'updateQuickMessage',
				description: 'Cập nhật tin nhắn nhanh',
				action: 'Cập nhật tin nhắn nhanh',
			},
			{
				name: 'Xóa Tin Nhắn Nhanh',
				value: 'removeQuickMessage',
				description: 'Xóa tin nhắn nhanh',
				action: 'Xóa tin nhắn nhanh',
			},
			{
				name: 'Đánh Dấu Chưa Đọc',
				value: 'addUnreadMark',
				description: 'Đánh dấu một cuộc trò chuyện là chưa đọc',
				action: 'Đánh dấu chưa đọc',
			},
			{
				name: 'Bỏ Đánh Dấu Chưa Đọc',
				value: 'removeUnreadMark',
				description: 'Bỏ đánh dấu chưa đọc cho một cuộc trò chuyện',
				action: 'Bỏ đánh dấu chưa đọc',
			},
			{
				name: 'Lấy Danh Sách Đánh Dấu Chưa Đọc',
				value: 'getUnreadMark',
				description: 'Lấy danh sách các cuộc trò chuyện đã được đánh dấu chưa đọc',
				action: 'Lấy danh sách đánh dấu chưa đọc',
			},
        ],
        default: 'sendMessage',
    },
];
exports.zaloSendMessageFields = [
	// --- Gửi Link ---
	{
		displayName: 'ID cuộc trò chuyện / Thread ID',
		name: 'threadId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của cuộc trò chuyện để gửi link',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendLink'],
			},
		},
	},
	{
		displayName: 'Loại cuộc trò chuyện',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Cá nhân', value: 0 },
			{ name: 'Nhóm', value: 1 },
		],
		default: 0,
		description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendLink'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		description: 'URL của link cần gửi',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendLink'],
			},
		},
	},
	{
		displayName: 'Tiêu đề',
		name: 'title',
		type: 'string',
		default: '',
		description: 'Tiêu đề của link',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendLink'],
			},
		},
	},
	{
		displayName: 'Mô tả',
		name: 'desc',
		type: 'string',
		default: '',
		description: 'Mô tả của link',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendLink'],
			},
		},
	},
	{
		displayName: 'URL hình ảnh',
		name: 'thumb',
		type: 'string',
		default: '',
		description: 'URL của hình ảnh đại diện cho link',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendLink'],
			},
		},
	},

	// --- Chuyển tiếp tin nhắn ---
	{
		displayName: 'ID cuộc trò chuyện nguồn / Source Thread ID',
		name: 'sourceThreadId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của cuộc trò chuyện chứa tin nhắn cần chuyển tiếp',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['forwardMessage'],
			},
		},
	},
	{
		displayName: 'Loại cuộc trò chuyện nguồn',
		name: 'sourceType',
		type: 'options',
		options: [
			{ name: 'Cá nhân', value: 0 },
			{ name: 'Nhóm', value: 1 },
		],
		default: 0,
		description: 'Chọn loại cuộc trò chuyện nguồn (Cá nhân hoặc Nhóm)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['forwardMessage'],
			},
		},
	},
	{
		displayName: 'ID tin nhắn / Message ID',
		name: 'msgId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của tin nhắn cần chuyển tiếp',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['forwardMessage'],
			},
		},
	},
	{
		displayName: 'ID cuộc trò chuyện đích / Target Thread ID',
		name: 'targetThreadId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của cuộc trò chuyện để gửi tin nhắn chuyển tiếp đến',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['forwardMessage'],
			},
		},
	},
	{
		displayName: 'Loại cuộc trò chuyện đích',
		name: 'targetType',
		type: 'options',
		options: [
			{ name: 'Cá nhân', value: 0 },
			{ name: 'Nhóm', value: 1 },
		],
		default: 0,
		description: 'Chọn loại cuộc trò chuyện đích (Cá nhân hoặc Nhóm)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['forwardMessage'],
			},
		},
	},

	// --- Thêm tin nhắn nhanh ---
	{
		displayName: 'Từ khóa',
		name: 'keyword',
		type: 'string',
		default: '',
		required: true,
		description: 'Từ khóa để gọi tin nhắn nhanh',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['addQuickMessage', 'updateQuickMessage', 'removeQuickMessage'],
			},
		},
	},
	{
		displayName: 'Tiêu đề',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		description: 'Tiêu đề của tin nhắn nhanh',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['addQuickMessage', 'updateQuickMessage'],
			},
		},
	},

	// --- Đánh dấu chưa đọc ---
	{
		displayName: 'ID cuộc trò chuyện / Thread ID',
		name: 'threadId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của cuộc trò chuyện cần đánh dấu/bỏ đánh dấu chưa đọc',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['addUnreadMark', 'removeUnreadMark'],
			},
		},
	},
	{
		displayName: 'Loại cuộc trò chuyện',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Cá nhân', value: 0 },
			{ name: 'Nhóm', value: 1 },
		],
		default: 0,
		description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['addUnreadMark', 'removeUnreadMark'],
			},
		},
	},
	// --- Add Reaction ---
	{
		displayName: 'ID cuộc trò chuyện / Thread ID',
		name: 'threadId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của cuộc trò chuyện chứa tin nhắn',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['addReaction'],
			},
		},
	},
	{
		displayName: 'Loại cuộc trò chuyện',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Cá nhân', value: 0 },
			{ name: 'Nhóm', value: 1 },
		],
		default: 0,
		description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['addReaction'],
			},
		},
	},
	{
		displayName: 'ID Tin nhắn / Message ID',
		name: 'msgId',
		type: 'string',
		default: '',
		required: true,
		placeholder: '{{$json["message"]["data"]["msgId"]}}',
		description: 'ID của tin nhắn muốn thả reaction. Có thể lấy từ node trước.',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['addReaction'],
			},
		},
	},
	{
		displayName: 'Client Message ID',
		name: 'cliMsgId',
		type: 'string',
		default: '',
		required: true,
		placeholder: '{{$json["message"]["data"]["cliMsgId"]}}',
		description: 'Client Message ID của tin nhắn muốn thả reaction. Có thể lấy từ node trước.',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['addReaction'],
			},
		},
	},
	{
		displayName: 'Reaction',
		name: 'reaction',
		type: 'options',
		default: 'LIKE',
		description: 'Chọn reaction để thả vào tin nhắn',
		options: [
			{ name: '❤️', value: 'HEART' },
			{ name: '👍', value: 'LIKE' },
			{ name: '😂', value: 'HAHA' },
			{ name: '😮', value: 'WOW' },
			{ name: '😢', value: 'SAD' },
			{ name: '😠', value: 'ANGRY' },
			{ name: '🙏', value: 'PRAY' },
		],
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['addReaction'],
			},
		},
	},
// --- Send Voice ---
	{
		displayName: 'ID cuộc trò chuyện / Thread ID',
		name: 'threadId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của cuộc trò chuyện để gửi tin nhắn thoại',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendVoice'],
			},
		},
	},
	{
		displayName: 'Loại cuộc trò chuyện',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Cá nhân', value: 0 },
			{ name: 'Nhóm', value: 1 },
		],
		default: 0,
		description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendVoice'],
			},
		},
	},
	{
		displayName: 'URL Tin nhắn thoại (M4A)',
		name: 'voiceUrl',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'https://example.com/voice.m4a',
		description: 'URL công khai của file âm thanh .m4a',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendVoice'],
			},
		},
	},

	// --- Send Card ---
	{
		displayName: 'ID cuộc trò chuyện / Thread ID',
		name: 'threadId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của cuộc trò chuyện để gửi danh thiếp',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendCard'],
			},
		},
	},
	{
		displayName: 'Loại cuộc trò chuyện',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Cá nhân', value: 0 },
			{ name: 'Nhóm', value: 1 },
		],
		default: 0,
		description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendCard'],
			},
		},
	},
	{
		displayName: 'ID Người dùng (Danh thiếp)',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của người dùng có danh thiếp bạn muốn gửi',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendCard'],
			},
		},
	},
	{
		displayName: 'Số điện thoại (Tùy chọn)',
		name: 'phoneNumber',
		type: 'string',
		default: '',
		required: false,
		description: 'Số điện thoại của người dùng trong danh thiếp',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendCard'],
			},
		},
	},

	// --- Pin Conversation ---
	{
		displayName: 'Hành động',
		name: 'pinAction',
		type: 'options',
		options: [
			{ name: 'Ghim', value: 'pin' },
			{ name: 'Bỏ ghim', value: 'unpin' },
		],
		default: 'pin',
		description: 'Chọn hành động ghim hoặc bỏ ghim',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['pinConversation'],
			},
		},
	},
	{
		displayName: 'ID cuộc trò chuyện / Thread ID',
		name: 'threadId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của cuộc trò chuyện để ghim/bỏ ghim',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['pinConversation'],
			},
		},
	},
	{
		displayName: 'Loại cuộc trò chuyện',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Cá nhân', value: 0 },
			{ name: 'Nhóm', value: 1 },
		],
		default: 0,
		description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['pinConversation'],
			},
		},
	},

	// --- Send Video ---
	{
		displayName: 'ID cuộc trò chuyện / Thread ID',
		name: 'threadId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID của cuộc trò chuyện để gửi video',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Loại cuộc trò chuyện',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Cá nhân', value: 0 },
			{ name: 'Nhóm', value: 1 },
		],
		default: 0,
		description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Video URL',
		name: 'videoUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'The URL of the video to send (must be publicly accessible)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Thumbnail URL',
		name: 'thumbnailUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'The URL of the video thumbnail (must be publicly accessible)',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Phụ đề / Caption',
		name: 'caption',
		type: 'string',
		default: '',
		description: 'Phụ đề cho video',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendVideo'],
			},
		},
	},
	{
		displayName: 'Tùy chọn Video nâng cao',
		name: 'videoOptions',
		type: 'collection',
		placeholder: 'Thêm tùy chọn',
		default: {},
		description: 'Chỉ định các tùy chọn nâng cao cho video',
		displayOptions: {
			show: {
				resource: ['zaloSendMessage'],
				operation: ['sendVideo'],
			},
		},
		options: [
			{
				displayName: 'Thời lượng (giây)',
				name: 'duration',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Thời lượng của video tính bằng giây',
			},
			{
				displayName: 'Chiều rộng (pixels)',
				name: 'width',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 1280,
				description: 'Chiều rộng của video tính bằng pixel',
			},
			{
				displayName: 'Chiều cao (pixels)',
				name: 'height',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 720,
				description: 'Chiều cao của video tính bằng pixel',
			},
		],
	},

    // Query String cho getStickers
    {
        displayName: 'Query String',
        name: 'queryString',
        type: 'string',
        default: '',
        required: false,
        placeholder: 'Nhập từ khóa tìm kiếm / Enter search keyword',
        description: 'Tùy chọn: Tìm kiếm sticker theo tên, tag... / Optional: Search sticker by name, tag... (nếu API hỗ trợ)',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['getStickers'],
            },
        },
    },
    // --- Cơ bản ---
    // Gửi tin nhắn
    {
        displayName: 'ID cuộc trò chuyện / Thread ID',
        name: 'threadId',
        type: 'string',
        default: '',
        required: true,
        placeholder: 'Nhập ID cuộc trò chuyện / Enter thread ID',
        description: 'ID của cuộc trò chuyện để gửi tin nhắn / The ID of the conversation to send the message to',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['sendMessage'],
            },
        },
    },
    // Lấy chi tiết sticker
    {
        displayName: 'Sticker ID',
        name: 'stickerId',
        type: 'string',
        default: '',
        required: true,
        placeholder: 'Nhập Sticker ID / Enter sticker ID',
        description: 'ID của sticker muốn lấy chi tiết / The ID of the sticker to get detail',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['getStickersDetail'],
            },
        },
    },
    // Gửi sticker
    {
        displayName: 'ID cuộc trò chuyện / Thread ID',
        name: 'threadId',
        type: 'string',
        default: '',
        required: true,
        placeholder: 'Nhập ID cuộc trò chuyện / Enter thread ID',
        description: 'ID của cuộc trò chuyện để gửi sticker / The ID of the conversation to send the sticker to',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['sendSticker'],
            },
        },
    },
    {
        displayName: 'Loại cuộc trò chuyện',
        name: 'type',
        type: 'options',
        options: [
            {
                name: 'Cá nhân',
                value: 0,
            },
            {
                name: 'Nhóm',
                value: 1,
            },
        ],
        default: 0,
        description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['sendSticker'],
            },
        },
    },
    {
        displayName: 'Sticker ID',
        name: 'stickerId',
        type: 'string',
        default: '',
        required: true,
        placeholder: 'Nhập Sticker ID / Enter sticker ID',
        description: 'ID của sticker muốn gửi / The ID of the sticker to send',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['sendSticker'],
            },
        },
    },
    {
        displayName: 'Loại cuộc trò chuyện',
        name: 'type',
        type: 'options',
        options: [
            {
                name: 'Cá nhân',
                value: 0,
            },
            {
                name: 'Nhóm',
                value: 1,
            },
        ],
        default: 0,
        description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['sendMessage'],
            },
        },
    },
    {
        displayName: 'Nội dung tin nhắn / Message Content',
        name: 'message',
        type: 'string',
        default: '',
        required: true,
        placeholder: 'Nhập nội dung tin nhắn / Enter message content',
        description: 'Nội dung tin nhắn muốn gửi / The content of the message to send',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['sendMessage'],
            },
        },
    },
    {
        displayName: 'Độ khẩn cấp / Urgency',
        name: 'urgency',
        type: 'options',
        options: [
            {
                name: 'Bình thường / Default',
                value: 0,
            },
            {
                name: 'Quan trọng / Important',
                value: 1,
            },
            {
                name: 'Khẩn cấp / Urgent',
                value: 2,
            },
        ],
        default: 0,
        description: 'Chọn mức độ khẩn cấp của tin nhắn / Select the urgency level of the message',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['sendMessage'],
            },
        },
    },
    // --- Nâng cao ---
    {
        displayName: 'Tùy chọn nâng cao / Advanced Options',
        name: 'advancedOptions',
        type: 'collection',
        placeholder: 'Thêm tùy chọn nâng cao / Add advanced option',
        default: {},
        options: [
            {
                displayName: 'Đề cập người dùng / Mentions',
                name: 'mentions',
                type: 'collection',
                placeholder: 'Thêm đề cập / Add mention',
                default: {},
                options: [
                    {
                        displayName: 'ID người dùng / User ID',
                        name: 'uid',
                        type: 'string',
                        default: '',
                        description: 'ID của người dùng được đề cập / The ID of the mentioned user',
                    },
                    {
                        displayName: 'Vị trí / Position',
                        name: 'pos',
                        type: 'number',
                        default: 0,
                        description: 'Vị trí đề cập trong tin nhắn / The position of the mention in the message',
                    },
                    {
                        displayName: 'Độ dài / Length',
                        name: 'len',
                        type: 'number',
                        default: 0,
                        description: 'Độ dài của đề cập / The length of the mention',
                    },
                ],
                description: 'Đề cập người dùng trong tin nhắn / Mention users in the message',
            },
            {
                displayName: 'Trích dẫn tin nhắn / Quote Message',
                name: 'quote',
                type: 'collection',
                placeholder: 'Thêm trích dẫn / Add quote',
                default: {},
                options: [
                    {
                    displayName: 'Chế độ lấy dữ liệu / Data Source',
                    name: 'mode',
                    type: 'options',
                    options: [
                        { name: 'Tự động lấy từ node trước / Auto detect from previous node', value: 'auto' },
                        { name: 'Nhập thủ công / Define below', value: 'manual' }
                    ],
                    default: 'auto',
                    description: 'Chọn cách lấy dữ liệu quote / Choose how to get quote data',
                    },
                    {
                    displayName: 'ID người gửi / Sender UID',
                    name: 'uidFrom',
                    type: 'string',
                    default: '',
                    placeholder: '{{$json["message"]["data"]["uidFrom"]}}',
                    description: 'ID của người gửi tin nhắn gốc / UID of the original sender (auto: {{$json["message"]["data"]["uidFrom"]}})',
                    displayOptions: {
                        show: { mode: ['manual'] }
                    }
                    },
                    {
                    displayName: 'ID tin nhắn / Message ID',
                    name: 'msgId',
                    type: 'string',
                    default: '',
                    placeholder: '{{$json["message"]["data"]["msgId"]}}',
                    description: 'ID của tin nhắn gốc / ID of the original message (auto: {{$json["message"]["data"]["msgId"]}})',
                    displayOptions: {
                        show: { mode: ['manual'] }
                    }
                    },
                    {
                    displayName: 'cliMsgId',
                    name: 'cliMsgId',
                    type: 'string',
                    default: '',
                    placeholder: '{{$json["message"]["data"]["cliMsgId"]}}',
                    description: 'ID cliMsgId của tin nhắn / cliMsgId of the message (auto: {{$json["message"]["data"]["cliMsgId"]}})',
                    displayOptions: {
                        show: { mode: ['manual'] }
                    }
                    },
                    {
                    displayName: 'Nội dung trích dẫn / Quoted Content',
                    name: 'contentquote',
                    type: 'string',
                    default: '',
                    placeholder: '{{$json["message"]["data"]["content"]}}',
                    description: 'Nội dung tin nhắn được trích dẫn / The content of the quoted message (auto: {{$json["message"]["data"]["content"]}})',
                    displayOptions: {
                        show: { mode: ['manual'] }
                    }
                    }
                ],
                description: 'Trích dẫn một tin nhắn trước đó / Quote a previous message',
            },
            {
                displayName: 'Ảnh đính kèm / Attachments',
                name: 'attachments',
                type: 'fixedCollection',
                typeOptions: {
                    multipleValues: true,
                },
                placeholder: 'Thêm ảnh / Add attachment',
                default: {},
                options: [
                    {
                        name: 'attachment',
                        displayName: 'Ảnh / Image',
                        values: [
                            {
                                displayName: 'Loại / Type',
                                name: 'type',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Đường dẫn ảnh (URL) / Image URL',
                                        value: 'url',
                                    }
                                ],
                                default: 'url',
                                description: 'Chọn loại file đính kèm / Choose the type of attachment',
                            },
                            {
                                displayName: 'URL ảnh / Image URL',
                                name: 'imageUrl',
                                type: 'string',
                                default: '',
                                displayOptions: {
                                    show: {
                                        'type': ['url'],
                                    },
                                },
                                description: 'URL công khai của ảnh / Public URL of the image',
                            }
                        ],
                    },
                ],
                description: 'Một hoặc nhiều ảnh đính kèm để gửi / One or more images to send',
            },
        ],
        description: 'Các tùy chọn nâng cao cho tin nhắn (đề cập, trích dẫn, ảnh đính kèm) / Advanced options for the message (mentions, quotes, attachments)',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['sendMessage'],
            },
        },
    },
    // --- Cho sendMessageStatus ---
    {
        displayName: 'ID cuộc trò chuyện / Thread ID',
        name: 'threadId',
        type: 'string',
        default: '',
        required: true,
        placeholder: 'Nhập ID cuộc trò chuyện / Enter thread ID',
        description: 'ID của cuộc trò chuyện để gửi trạng thái / The ID of the conversation to send the status to',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['sendMessageStatus'],
            },
        },
    },
    {
        displayName: 'Loại cuộc trò chuyện',
        name: 'type',
        type: 'options',
        options: [
            {
                name: 'Cá nhân',
                value: 0,
            },
            {
                name: 'Nhóm',
                value: 1,
            },
        ],
        default: 0,
        description: 'Chọn loại cuộc trò chuyện (Cá nhân hoặc Nhóm)',
        displayOptions: {
            show: {
                resource: ['zaloSendMessage'],
                operation: ['sendMessageStatus'],
            },
        },
    },
];
//# sourceMappingURL=ZaloSendMessageDescription.js.map