"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloTTSApi = void 0;
class ZaloTTSApi {
    constructor() {
        this.name = 'zaloTTSApi';
        this.displayName = 'ZaloTTS API';
        this.documentationUrl = 'https://ai.zalo.cloud/docs/api/text-to-audio-converter';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'xiApiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'apikey': '={{$credentials.xiApiKey}}',
                    accept: 'application/x-www-form-urlencoded',
                },
            },
        };
    }
}
exports.ZaloTTSApi = ZaloTTSApi;
