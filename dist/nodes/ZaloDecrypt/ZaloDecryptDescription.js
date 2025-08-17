"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zaloDecryptOperations = exports.zaloDecryptResources = void 0;

exports.zaloDecryptResources = [
    {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Zalo Decrypt',
                value: 'zaloDecrypt',
            },
        ],
        default: 'zaloDecrypt',
    },
];

exports.zaloDecryptOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['zaloDecrypt'],
            },
        },
        options: [
            {
                name: 'Giải mã chuỗi AES',
                value: 'decryptAES',
                description: 'Giải mã chuỗi đã được mã hóa bằng AES',
                action: 'Giải mã chuỗi AES',
            },
            {
                name: 'Giải mã dữ liệu getLoginInfo',
                value: 'decryptLoginInfo',
                description: 'Giải mã dữ liệu từ API getLoginInfo của Zalo',
                action: 'Giải mã dữ liệu getLoginInfo',
            },
            {
                name: 'Tạo secretKey từ zcid + zcid_ext',
                value: 'getEncryptKey',
                description: 'Sinh secretKey (enk) từ zcid và zcid_ext',
                action: 'Tạo secretKey từ zcid + zcid_ext',
            },
        ],
        default: 'decryptAES',
    },
];
