"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevenLabsApi = void 0;
class ElevenLabsApi {
    constructor() {
        this.name = 'elevenLabsApi';
        this.displayName = 'ElevenLabs API';
        this.documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
        this.properties = [
            {
                displayName: 'XI API Key',
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
                    'xi-api-key': '={{$credentials.xiApiKey}}',
                    accept: 'application/json',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.elevenlabs.io/v1',
                url: '/voices',
            },
        };
    }
}
exports.ElevenLabsApi = ElevenLabsApi;
//# sourceMappingURL=ElevenLabsApi.credentials.js.map