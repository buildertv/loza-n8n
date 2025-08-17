"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zaloGetSecretKeyOperations = exports.zaloGetSecretKeyResources = void 0;

exports.zaloGetSecretKeyResources = [
    {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Zalo Get Secret Key',
                value: 'zaloGetSecretKey',
            },
        ],
        default: 'zaloGetSecretKey',
    },
];

exports.zaloGetSecretKeyOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'zaloGetSecretKey',
                ],
            },
        },
        options: [
            {
                name: 'Get Secret Key',
                value: 'getSecretKey',
                description: 'Lấy Secret Key (zpw_enk) từ phiên đăng nhập hiện tại',
                action: 'Get secret key from current session',
            },
        ],
        default: 'getSecretKey',
    },
];
