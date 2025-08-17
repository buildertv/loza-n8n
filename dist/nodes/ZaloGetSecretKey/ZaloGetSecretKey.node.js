"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloGetSecretKey = void 0;

const n8n_workflow_1 = require("n8n-workflow");
const ZaloGetSecretKeyDescription_1 = require("./ZaloGetSecretKeyDescription");
const zalo_sdk_1 = require("../zalo-sdk");

class ZaloGetSecretKey {
    constructor() {
        this.description = {
            displayName: 'Zalo Get Secret Key',
            name: 'zaloGetSecretKey',
            icon: 'file:../shared/zalo.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Lấy Secret Key (zpw_enk) từ phiên đăng nhập hiện tại',
            defaults: {
                name: 'Zalo Get Secret Key',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'zaloApi',
                    required: true,
                },
            ],
            properties: [
                ...ZaloGetSecretKeyDescription_1.zaloGetSecretKeyResources,
                ...ZaloGetSecretKeyDescription_1.zaloGetSecretKeyOperations,
            ],
        };
    }

    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);

        try {
            if (resource === 'zaloGetSecretKey') {
                if (operation === 'getSecretKey') {
                    // Lấy thông tin đăng nhập từ credentials
                    const credentials = await this.getCredentials('zaloApi');
                    
                    // Khởi tạo Zalo SDK với thông tin đăng nhập
                    const zalo = new zalo_sdk_1.Zalo({
                        selfListen: true,
                        logging: true,
                    });

                    // Đăng nhập với thông tin từ credentials
                    const cookie = credentials.cookie ? 
                        (typeof credentials.cookie === 'string' ? 
                            JSON.parse(credentials.cookie) : credentials.cookie) : [];
                    const imei = credentials.imei || '';
                    const userAgent = credentials.userAgent || '';
                    
                    this.logger.info('Đang đăng nhập để lấy Secret Key...');
                    
                    // Đăng nhập và lấy API
                    const api = await zalo.login({
                        cookie,
                        imei,
                        userAgent,
                    });
                    
                    // Lấy context từ API
                    const context = api.getContext();
                    
                    if (!context || !context.secretKey) {
                        throw new n8n_workflow_1.NodeOperationError(
                            this.getNode(),
                            'Không thể lấy Secret Key. Vui lòng đảm bảo đã đăng nhập thành công.'
                        );
                    }
                    
                    this.logger.info('Đã lấy được Secret Key thành công');
                    
                    // Trả về Secret Key
                    returnData.push({
                        json: {
                            success: true,
                            secretKey: context.secretKey,
                            uid: context.uid || '',
                        },
                    });
                }
            }
        } catch (error) {
            if (this.continueOnFail()) {
                returnData.push({
                    json: {
                        success: false,
                        error: error.message,
                    },
                });
            } else {
                throw error;
            }
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}

exports.ZaloGetSecretKey = ZaloGetSecretKey;
