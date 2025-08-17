"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zaloGroupFields = exports.zaloGroupOperations = void 0;


exports.zaloGroupOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
            },
        },
        options: [
            {
                name: 'Tạo Nhóm',
                value: 'createGroup',
                description: 'Tạo một nhóm mới',
                action: 'Tạo Nhóm',
            },
            {
                name: 'Lấy Thông Tin Nhóm',
                value: 'getGroupInfo',
                description: 'Lấy thông tin của một nhóm',
                action: 'Lấy Thông Tin Nhóm',
            },
            {
                name: 'Thêm Phó Nhóm',
                value: 'addGroupDeputy',
                description: 'Thêm phó nhóm cho một nhóm',
                action: 'Thêm Phó Nhóm',
            },
            {
                name: 'Thêm Thành Viên Vào Nhóm',
                value: 'addUserToGroup',
                description: 'Thêm thành viên vào nhóm',
                action: 'Thêm Thành Viên Vào Nhóm',
            },
            {
                name: 'Đổi Avatar Nhóm',
                value: 'changeGroupAvatar',
                description: 'Đổi avatar của nhóm',
                action: 'Đổi Avatar Nhóm',
            },
            {
                name: 'Đổi Tên Nhóm',
                value: 'changeGroupName',
                description: 'Đổi tên của nhóm',
                action: 'Đổi Tên Nhóm',
            },
            {
                name: 'Lấy Danh Sách Thành Viên',
                value: 'getGroupMembers',
                description: 'Lấy danh sách thành viên của nhóm',
                action: 'Lấy Danh Sách Thành Viên',
            },
            {
                name: 'Lấy Tất Cả Nhóm',
                value: 'getAllGroups',
                description: 'Lấy danh sách tất cả các nhóm',
                action: 'Lấy Tất Cả Nhóm',
            },
            {
                name: 'Xóa Thành Viên Khỏi Nhóm',
                value: 'removeUserFromGroup',
                description: 'Xóa thành ra viên khỏi nhóm',
                action: 'Xóa Thành Viên Khỏi Nhóm',
            },
            {
                name: 'Tạo Ghi Chú',
                value: 'createNote',
                description: 'Tạo ghi chú trong nhóm',
                action: 'Tạo Ghi Chú',
            },
            {
                name: 'Thay Đổi Chủ Nhóm',
                value: 'changeGroupOwner',
                description: 'Thay đổi chủ sở hữu của nhóm',
                action: 'Thay Đổi Chủ Nhóm',
            },
            {
                name: 'Giải Tán Nhóm',
                value: 'disperseGroup',
                description: 'Giải tán một nhóm. Thao tác này không thể hoàn tác.',
                action: 'Giải Tán Nhóm',
            },
            {
                name: 'Lấy Thông Tin Thành Viên',
                value: 'getGroupMembersInfo',
                description: 'Lấy thông tin chi tiết của một hoặc nhiều thành viên trong nhóm.',
                action: 'Lấy thông tin thành viên',
            },
            {
                name: 'Lấy Danh Sách Chat Tự Động Xóa',
                value: 'getAutoDeleteChat',
                description: 'Lấy danh sách các cuộc trò chuyện có chế độ tự động xóa',
                action: 'Lấy Danh Sách Chat Tự Động Xóa',
            },
            {
                name: 'Cập nhật cài đặt tự động xóa',
                value: 'updateAutoDeleteChat',
                description: 'Cập nhật cài đặt tự động xóa tin nhắn cho nhóm hoặc cuộc trò chuyện cá nhân',
                action: 'Cập nhật cài đặt tự động xóa',
            },
            {
                name: 'Cập Nhật Cài Đặt Nhóm',
                value: 'updateGroupSettings',
                description: 'Cập nhật các cài đặt cho nhóm',
                action: 'Cập Nhật Cài Đặt Nhóm',
            },
            {
                name: 'Lấy Thông Tin Link Nhóm',
                value: 'getGroupLinkInfo',
                description: 'Lấy thông tin về link tham gia nhóm',
                action: 'Lấy Thông Tin Link Nhóm',
            },
            {
                name: 'Bật Link Tham Gia Nhóm',
                value: 'enableGroupLink',
                description: 'Bật tính năng link tham gia nhóm',
                action: 'Bật Link Tham Gia Nhóm',
            },
            {
                name: 'Tắt Link Tham Gia Nhóm',
                value: 'disableGroupLink',
                description: 'Tắt tính năng link tham gia nhóm',
                action: 'Tắt Link Tham Gia Nhóm',
            },
            {
                name: 'Tham Gia Nhóm',
                value: 'joinGroup',
                description: 'Tham gia nhóm thông qua link',
                action: 'Tham Gia Nhóm',
            },
            {
                name: 'Rời Khỏi Nhóm',
                value: 'leaveGroup',
                description: 'Rời khỏi một nhóm',
                action: 'Rời Khỏi Nhóm',
            },
            {
                name: 'Mời Người Dùng Vào Nhiều Nhóm',
                value: 'inviteUserToGroups',
                description: 'Mời một người dùng vào nhiều nhóm cùng lúc',
                action: 'Mời Người Dùng Vào Nhiều Nhóm',
            },
            {
                name: 'Tạo Nhắc Nhở',
                value: 'createReminder',
                description: 'Tạo một nhắc nhở mới trong nhóm',
                action: 'Tạo Nhắc Nhở',
            },
            {
                name: 'Chỉnh Sửa Nhắc Nhở',
                value: 'editReminder',
                description: 'Chỉnh sửa một nhắc nhở đã tạo',
                action: 'Chỉnh Sửa Nhắc Nhở',
            },
            {
                name: 'Xóa Nhắc Nhở',
                value: 'removeReminder',
                description: 'Xóa một nhắc nhở',
                action: 'Xóa Nhắc Nhở',
            },
            {
                name: 'Lấy Danh Sách Nhắc Nhở',
                value: 'getListReminder',
                description: 'Lấy danh sách các nhắc nhở trong nhóm',
                action: 'Lấy Danh Sách Nhắc Nhở',
            },
            {
                name: 'Lấy Chi Tiết Nhắc Nhở',
                value: 'getReminder',
                description: 'Lấy thông tin chi tiết về một nhắc nhở',
                action: 'Lấy Chi Tiết Nhắc Nhở',
            },
            {
                name: 'Lấy Phản Hồi Nhắc Nhở',
                value: 'getReminderResponses',
                description: 'Lấy danh sách phản hồi cho một nhắc nhở',
                action: 'Lấy Phản Hồi Nhắc Nhở',
            },
        ],
        default: 'createGroup',
    },
];
exports.zaloGroupFields = [
    // Các trường cho updateAutoDeleteChat
    {
        displayName: 'ID Cuộc Trò Chuyện',
        name: 'conversationId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['updateAutoDeleteChat'],
            },
        },
        description: 'ID của cuộc trò chuyện cần cập nhật chế độ tự động xóa',
    },
    {
        displayName: 'Thời Gian Tự Động Xóa (giây)',
        name: 'autoDeleteTime',
        type: 'number',
        required: true,
        default: 0,
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['updateAutoDeleteChat'],
            },
        },
        description: 'Thời gian tự động xóa tin nhắn (giây). Đặt 0 để tắt tính năng tự động xóa.',
    },
    {
        displayName: 'Loại Cuộc Trò Chuyện',
        name: 'threadType',
        type: 'options',
        required: true,
        default: 'group',
        options: [
            {
                name: 'Nhóm',
                value: 'group',
            },
            {
                name: 'Cá Nhân',
                value: 'user',
            },
        ],
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['updateAutoDeleteChat'],
            },
        },
        description: 'Loại cuộc trò chuyện cần cập nhật chế độ tự động xóa',
    },
    
    // Các trường cho updateGroupSettings
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['updateGroupSettings', 'getGroupLinkInfo', 'enableGroupLink', 'disableGroupLink', 'leaveGroup'],
            },
        },
        description: 'ID của nhóm cần cập nhật cài đặt',
    },
    {
        displayName: 'Chỉ Admin Mới Được Thêm Thành Viên',
        name: 'onlyAdminCanAddMember',
        type: 'boolean',
        required: false,
        default: false,
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['updateGroupSettings'],
            },
        },
        description: 'Nếu bật, chỉ admin mới có thể thêm thành viên vào nhóm',
    },
    {
        displayName: 'Chỉ Admin Mới Được Thay Đổi Thông Tin Nhóm',
        name: 'onlyAdminCanChangeGroupInfo',
        type: 'boolean',
        required: false,
        default: false,
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['updateGroupSettings'],
            },
        },
        description: 'Nếu bật, chỉ admin mới có thể thay đổi thông tin nhóm',
    },
    
    // Các trường cho joinGroup
    {
        displayName: 'Link Nhóm',
        name: 'groupLink',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['joinGroup'],
            },
        },
        description: 'Link tham gia nhóm',
    },
    
    // Các trường cho inviteUserToGroups
    {
        displayName: 'ID Người Dùng',
        name: 'userId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['inviteUserToGroups'],
            },
        },
        description: 'ID của người dùng cần mời vào nhóm',
    },
    {
        displayName: 'Danh Sách ID Nhóm (phân cách bằng dấu phẩy)',
        name: 'groupIds',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['inviteUserToGroups'],
            },
        },
        description: 'Danh sách ID nhóm cần mời người dùng vào, phân cách bằng dấu phẩy',
    },
    {
        displayName: 'Tên Nhóm',
        name: 'groupName',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['createGroup'],
            },
        },
        description: 'Tên của nhóm mới',
    },
    {
        displayName: 'Danh Sách ID Thành Viên (nếu nhiều người dùng vui lòng phân cách bằng dấu phẩy)',
        name: 'userIds',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['createGroup'],
            },
        },
        description: 'Danh sách ID thành viên, phân cách bằng dấu phẩy',
    },
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['getGroupInfo'],
            },
        },
        description: 'ID của nhóm cần lấy thông tin',
    },
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['addGroupDeputy'],
            },
        },
        description: 'ID của nhóm',
    },
    {
        displayName: 'ID Người Dùng',
        name: 'userId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['addGroupDeputy'],
            },
        },
        description: 'ID của người dùng cần thêm làm phó nhóm',
    },
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['addUserToGroup'],
            },
        },
        description: 'ID của nhóm',
    },
    {
        displayName: 'Danh Sách ID Thành Viên (nếu nhiều người dùng vui lòng phân cách bằng dấu phẩy)',
        name: 'userIds',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['addUserToGroup'],
            },
        },
        description: 'Danh sách ID thành viên, phân cách bằng dấu phẩy',
    },
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['changeGroupAvatar'],
            },
        },
        description: 'ID của nhóm',
    },
    {
        displayName: 'URL Ảnh',
        name: 'imageUrl',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['changeGroupAvatar'],
            },
        },
        description: 'URL của ảnh đại diện mới',
    },
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['changeGroupName'],
            },
        },
        description: 'ID của nhóm',
    },
    {
        displayName: 'Tên Mới',
        name: 'newName',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['changeGroupName'],
            },
        },
        description: 'Tên mới của nhóm',
    },
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['getGroupMembers'],
            },
        },
        description: 'ID của nhóm',
    },
    {
        displayName: 'Giới Hạn',
        name: 'limit',
        type: 'number',
        default: 50,
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['getGroupMembers'],
            },
        },
        description: 'Số lượng thành viên tối đa cần lấy',
    },
    {
        displayName: 'Giới Hạn',
        name: 'limit',
        type: 'number',
        default: 50,
        required: true,
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['getAllGroups'],
            },
        },
        description: 'Số lượng nhóm tối đa cần lấy',
    },
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['removeUserFromGroup'],
            },
        },
        description: 'ID của nhóm',
    },
    {
        displayName: 'ID Người Dùng (nếu nhiều người dùng vui lòng phân cách bằng dấu phẩy)',
        name: 'userIds',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['removeUserFromGroup'],
            },
        },
        description: 'ID của người dùng cần xóa khỏi nhóm',
    },
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['createNote'],
            },
        },
        description: 'ID của nhóm',
    },
    {
        displayName: 'Nội Dung Ghi Chú',
        name: 'content',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['createNote'],
            },
        },
        description: 'Nội dung của ghi chú',
    },
    {
        displayName: 'Pin Ghi Chú',
        name: 'pinAct',
        type: 'boolean',
        required: true,
        default: false,
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['createNote'],
            },
        },
        description: 'Ghim ghi chú lên đầu nhóm',
    },
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['changeGroupOwner'],
            },
        },
        description: 'ID của nhóm cần thay đổi chủ sở hữu',
    },
    {
        displayName: 'ID Chủ Nhóm Mới',
        name: 'userId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['changeGroupOwner'],
            },
        },
        description: 'ID của người dùng sẽ trở thành chủ nhóm mới',
    },
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['disperseGroup'],
            },
        },
        description: 'ID của nhóm cần giải tán',
    },
    {
        displayName: 'Danh Sách ID Thành Viên (nếu nhiều người dùng vui lòng phân cách bằng dấu phẩy)',
        name: 'userIds',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['getGroupMembersInfo'],
            },
        },
        description: 'Danh sách ID thành viên cần lấy thông tin, phân cách bằng dấu phẩy',
    },
    
    // Trường dữ liệu cho createReminder
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        default: '',
        required: true,
        description: 'ID của nhóm để tạo nhắc nhở',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['createReminder'],
            },
        },
    },
    {
        displayName: 'Tiêu Đề Nhắc Nhở',
        name: 'title',
        type: 'string',
        default: '',
        required: true,
        description: 'Tiêu đề của nhắc nhở',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['createReminder'],
            },
        },
    },
    {
        displayName: 'Nội Dung Nhắc Nhở',
        name: 'content',
        type: 'string',
        default: '',
        description: 'Nội dung của nhắc nhở',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['createReminder'],
            },
        },
    },
    {
        displayName: 'Thời Gian Nhắc Nhở (timestamp)',
        name: 'timestamp',
        type: 'number',
        default: 0,
        required: true,
        description: 'Thời gian nhắc nhở (timestamp đơn vị milliseconds)',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['createReminder'],
            },
        },
    },
    
    // Trường dữ liệu cho editReminder
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        default: '',
        required: true,
        description: 'ID của nhóm chứa nhắc nhở',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['editReminder'],
            },
        },
    },
    {
        displayName: 'ID Nhắc Nhở',
        name: 'reminderId',
        type: 'string',
        default: '',
        required: true,
        description: 'ID của nhắc nhở cần chỉnh sửa',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['editReminder'],
            },
        },
    },
    {
        displayName: 'Tiêu Đề Nhắc Nhở Mới',
        name: 'title',
        type: 'string',
        default: '',
        description: 'Tiêu đề mới của nhắc nhở',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['editReminder'],
            },
        },
    },
    {
        displayName: 'Nội Dung Nhắc Nhở Mới',
        name: 'content',
        type: 'string',
        default: '',
        description: 'Nội dung mới của nhắc nhở',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['editReminder'],
            },
        },
    },
    {
        displayName: 'Thời Gian Nhắc Nhở Mới (timestamp)',
        name: 'timestamp',
        type: 'number',
        default: 0,
        description: 'Thời gian mới cho nhắc nhở (timestamp đơn vị milliseconds)',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['editReminder'],
            },
        },
    },
    
    // Trường dữ liệu cho removeReminder
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        default: '',
        required: true,
        description: 'ID của nhóm chứa nhắc nhở',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['removeReminder'],
            },
        },
    },
    {
        displayName: 'ID Nhắc Nhở',
        name: 'reminderId',
        type: 'string',
        default: '',
        required: true,
        description: 'ID của nhắc nhở cần xóa',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['removeReminder'],
            },
        },
    },
    
    // Trường dữ liệu cho getListReminder
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        default: '',
        required: true,
        description: 'ID của nhóm để lấy danh sách nhắc nhở',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['getListReminder'],
            },
        },
    },
    
    // Trường dữ liệu cho getReminder
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        default: '',
        required: true,
        description: 'ID của nhóm chứa nhắc nhở',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['getReminder'],
            },
        },
    },
    {
        displayName: 'ID Nhắc Nhở',
        name: 'reminderId',
        type: 'string',
        default: '',
        required: true,
        description: 'ID của nhắc nhở cần lấy chi tiết',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['getReminder'],
            },
        },
    },
    
    // Trường dữ liệu cho getReminderResponses
    {
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        default: '',
        required: true,
        description: 'ID của nhóm chứa nhắc nhở',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['getReminderResponses'],
            },
        },
    },
    {
        displayName: 'ID Nhắc Nhở',
        name: 'reminderId',
        type: 'string',
        default: '',
        required: true,
        description: 'ID của nhắc nhở cần lấy phản hồi',
        displayOptions: {
            show: {
                resource: ['zaloGroup'],
                operation: ['getReminderResponses'],
            },
        },
    },
];
//# sourceMappingURL=ZaloGroupDescription.js.map