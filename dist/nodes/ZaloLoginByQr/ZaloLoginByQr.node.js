"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloLoginByQr = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const zalo_sdk_1 = require("../zalo-sdk");
const path = __importStar(require("path"));
const axios_1 = __importDefault(require("axios"));
class ZaloLoginByQr {
    constructor() {
        this.description = {
            displayName: 'Zalo Login Via QR Code',
            name: 'zaloLoginByQr',
            group: ['Zalo'],
            version: 1,
            description: 'LĐăng nhập Zalo bằng QR code và lưu thông tin vào Credentia',
            defaults: {
                name: 'Zalo Login Via QR Code',
            },
            inputs: ['main'],
            outputs: ['main'],
            icon: 'file:../shared/zalo.svg',
            credentials: [
                {
                    name: 'zaloApi',
                    required: false,
                    displayName: 'Zalo Credential to connect with',
                },
                {
                    name: 'n8nZaloApi',
                    required: true,
                    displayName: 'n8n Account Credential',
                },
            ],
            properties: [
                {
                    displayName: 'Proxy',
                    name: 'proxy',
                    type: 'string',
                    default: '',
                    placeholder: 'https://user:pass@host:port',
                    description: 'HTTP proxy to use for Zalo API requests',
                },
            ],
        };
    }
    async execute() {
        const returnData = [];
        const proxy = this.getNodeParameter('proxy', 0, '');
        const timeout = 30;
        const fileName = 'zalo-qr-code.png';
        let zaloCredential;
        let n8nCredential;
        try {
            zaloCredential = await this.getCredentials('zaloApi');
        }
        catch (error) {
        }
        try {
            n8nCredential = await this.getCredentials('n8nZaloApi');
        }
        catch (error) {
        }
        let selectedCredential = undefined;
        if (n8nCredential) {
            console.error('Using n8n account credential');
            selectedCredential = n8nCredential;
        }
        else if (zaloCredential) {
            console.error('Using Zalo API credential');
            selectedCredential = zaloCredential;
        }
        else {
            console.error('No credentials provided, will generate QR code for login');
        }
        try {
            const zaloOptions = {
                selfListen: true,
                logging: true,
            };
            if (proxy) {
                zaloOptions.proxy = proxy;
            }
            let zalo;
            if (selectedCredential) {
                console.error('Using existing Zalo credentials');
                zalo = new zalo_sdk_1.Zalo(zaloOptions);
                if (selectedCredential === n8nCredential) {
                    console.error('Using n8n credential to get Zalo credentials');
                    const n8nApiKey = selectedCredential.apiKey;
                    const n8nUrl = selectedCredential.url || 'http://localhost:5678';
                    console.error(`Using n8n API at ${n8nUrl} with API key ${n8nApiKey ? 'provided' : 'not provided'}`);
                    console.error('n8n credential support is not fully implemented yet. Will use QR code login.');
                    zalo = new zalo_sdk_1.Zalo(zaloOptions);
                }
                else {
                    console.error('Using Zalo credential for login');
                    const cookie = selectedCredential.cookie;
                    const imei = selectedCredential.imei;
                    const userAgent = selectedCredential.userAgent;
                    const supportCode = selectedCredential.supportCode;
                    const licenseKey = selectedCredential.licenseKey;
                    if (selectedCredential.proxy) {
                        console.error('Using proxy from credential:', selectedCredential.proxy);
                        zaloOptions.proxy = selectedCredential.proxy;
                    }
                    await zalo.login({
                        cookie,
                        imei,
                        userAgent,
                        supportCode,
                        licenseKey,
                    });
                }
            }
            else {
                zalo = new zalo_sdk_1.Zalo(zaloOptions);
            }
            console.error('Starting Zalo QR login process...');
            const processContext = (context) => {
                if (!context) {
                    console.error('Context is null or undefined');
                    return;
                }
                const cookie = context.cookie || '';
                const imei = context.imei || '';
                const userAgent = context.userAgent || '';
                console.error('=== ZALO CREDENTIALS ===');
                console.error('Cookie:', cookie ? `Received (length: ${typeof cookie === 'string' ? cookie.length : (Array.isArray(cookie) ? cookie.length : 'unknown')})` : 'None');
                console.error('IMEI:', imei ? imei : 'None');
                console.error('User Agent:', userAgent ? userAgent : 'None');
                console.error('=== END CREDENTIALS ===');
            };
            const setupEventListeners = (api) => {
                console.error('Setting up event listeners to get credentials');
                try {
                    if (typeof api.getContext === 'function') {
                        const contextResult = api.getContext();
                        if (contextResult && typeof contextResult.then === 'function') {
                            contextResult.then((context) => {
                                processContext(context);
                            }).catch((error) => {
                                console.error('Error getting context:', error);
                            });
                        }
                        else {
                            processContext(contextResult);
                        }
                    }
                    else {
                        console.error('getContext is not a function');
                        if (api.context) {
                            console.error('Found context in api object');
                            processContext(api.context);
                        }
                        else {
                            console.error('No context found in api object');
                        }
                    }
                }
                catch (error) {
                    console.error('Error in setupEventListeners:', error);
                }
            };
            const qrCodePromise = new Promise(async (resolve, reject) => {
                let isResolved = false;
                const timeoutId = setTimeout(() => {
                    if (!isResolved) {
                        isResolved = true;
                        reject(new n8n_workflow_1.NodeOperationError(this.getNode(), 'Timeout generating QR code. Please try again or check your Zalo connection.'));
                    }
                }, timeout * 1000);
                try {
                    let api = await zalo.loginQR(null, (qrEvent) => {
                        var _a, _b;
                        console.error('Received QR event type:', qrEvent ? qrEvent.type : 'no event');
                        switch (qrEvent.type) {
                            case 0:
                                if ((_a = qrEvent === null || qrEvent === void 0 ? void 0 : qrEvent.data) === null || _a === void 0 ? void 0 : _a.image) {
                                    const qrCodeBase64 = qrEvent.data.image;
                                    console.error('QR code generated, length:', qrCodeBase64.length);
                                    if (isResolved)
                                        return;
                                    clearTimeout(timeoutId);
                                    if (qrCodeBase64) {
                                        isResolved = true;
                                        resolve(qrCodeBase64);
                                    }
                                }
                                else {
                                    console.error('Could not get QR code from Zalo SDK');
                                    reject(new Error("Could not get QR code"));
                                }
                                break;
                            case 1:
                                console.error('QR code expired. Please try again.');
                                break;
                            case 2:
                                console.error('=== QR CODE SCANNED ===');
                                if (qrEvent === null || qrEvent === void 0 ? void 0 : qrEvent.data) {
                                    console.error('User:', qrEvent.data.display_name);
                                    console.error('Avatar:', qrEvent.data.avatar ? 'Yes' : 'No');
                                }
                                break;
                            case 3:
                                console.error('=== QR CODE DECLINED ===');
                                if ((_b = qrEvent === null || qrEvent === void 0 ? void 0 : qrEvent.data) === null || _b === void 0 ? void 0 : _b.code) {
                                    console.error('Decline code:', qrEvent.data.code);
                                }
                                break;
                            case 4:
                                console.error('=== GOT LOGIN INFO ===');
                                if (qrEvent === null || qrEvent === void 0 ? void 0 : qrEvent.data) {
                                    const cookie = qrEvent.data.cookie || [];
                                    const imei = qrEvent.data.imei || '';
                                    const userAgent = qrEvent.data.userAgent || '';
                                    console.error('Cookie received:', cookie.length > 0 ? 'Yes' : 'No');
                                    console.error('IMEI received:', imei ? 'Yes' : 'No');
                                    console.error('User Agent received:', userAgent ? 'Yes' : 'No');
                                    try {
                                        if (cookie.length > 0 || imei || userAgent) {
                                            const credentialName = 'Zalo API Credentials';
                                            const credentialData = {
                                                cookie: JSON.stringify(cookie),
                                                imei: imei,
                                                userAgent: userAgent,
                                                proxy: proxy || '',
                                                supportCode: '',
                                                licenseKey: ''
                                            };
                                            try {
                                                console.error('Attempting to create Zalo credential via n8n API');
                                                const credentialApiData = {
                                                    name: credentialName,
                                                    type: 'zaloApi',
                                                    nodesAccess: [],
                                                    data: credentialData
                                                };
                                                const ports = [5678];
                                                const createCredentialOnPort = async (port) => {
                                                    const n8nApi = await this.getCredentials('n8nZaloApi');
                                                    const n8nApiUrl = n8nApi.url;
                                                    const fullApiUrl = `${n8nApiUrl}/api/v1/credentials`;
                                                    const n8nApiKey = n8nApi.apiKey;
                                                    console.error(`Trying to create credential via n8n API at ${fullApiUrl}`);
                                                    try {
                                                        await axios_1.default.post(fullApiUrl, credentialApiData, {
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                'X-N8N-API-KEY': n8nApiKey
                                                            },
                                                        });
                                                        console.error('Credential created successfully via n8n API');
                                                        console.error('Credential ID:');
                                                        return true;
                                                    }
                                                    catch (apiError) {
                                                        console.error(`Error creating credential on port ${port}:`, apiError.message);
                                                        return false;
                                                    }
                                                };
                                                let credentialCreated = false;
                                                (async () => {
                                                    for (const port of ports) {
                                                        try {
                                                            const result = await createCredentialOnPort.call(this, port);
                                                            if (result) {
                                                                credentialCreated = true;
                                                                break;
                                                            }
                                                        }
                                                        catch (error) {
                                                            console.error(`Error trying port ${port}:`, error.message);
                                                        }
                                                    }
                                                })().catch(error => {
                                                    console.error('Error in credential creation:', error.message);
                                                });
                                                if (!credentialCreated) {
                                                    console.error('Could not create credential via n8n API on any port.');
                                                    console.error('Credential info saved to file. You can create it manually using:');
                                                    console.error('node auto-create-zalo-credential.js');
                                                }
                                            }
                                            catch (error) {
                                                console.error(`Error creating credential: ${error.message}`);
                                                console.error('Credential info saved to file. You can create it manually using:');
                                                console.error('node auto-create-zalo-credential.js');
                                            }
                                        }
                                        else {
                                            console.error('=== NO CREDENTIALS TO SAVE ===');
                                            console.error('No login information available to save');
                                        }
                                    }
                                    catch (fileError) {
                                        console.error('Error saving credentials:', fileError.message);
                                    }
                                }
                                break;
                            default:
                                console.error('Unknown QR event type:', qrEvent.type);
                        }
                    });
                    // [CASCADE-FIX] Đã xóa bỏ trình nghe lén chạy ngầm khỏi node chức năng để ngăn log liên tục.
                    // Chức năng Đăng nhập bằng QR của node này có thể bị ảnh hưởng do logic đã bị đặt sai vị trí.
                }
                catch (error) {
                    clearTimeout(timeoutId);
                    if (!isResolved) {
                        isResolved = true;
                        reject(error);
                    }
                }
            });
            const qrCodeBase64 = await qrCodePromise;
            const binaryData = Buffer.from(qrCodeBase64, 'base64');
            const newItem = {
                json: {
                    success: true,
                    message: selectedCredential === n8nCredential
                        ? 'Using n8n account credential. QR code generated successfully.'
                        : (selectedCredential === zaloCredential
                            ? 'Using existing Zalo credentials. QR code generated successfully.'
                            : 'QR code generated successfully. Scan with Zalo app to login.'),
                    fileName,
                    usingExistingCredential: !!selectedCredential,
                    credentialType: selectedCredential === n8nCredential ? 'n8nZaloApi' : (selectedCredential === zaloCredential ? 'zaloApi' : null),
                },
                binary: {
                    data: await this.helpers.prepareBinaryData(binaryData, fileName, 'image/png'),
                },
            };
            returnData.push(newItem);
            if (returnData[0] && returnData[0].json) {
                if (!selectedCredential) {
                    returnData[0].json.credentialInstructions = 'Credentials have been saved to file. Credentials will be created automatically if n8n API credentials are provided.';
                    returnData[0].json.credentialFilePath = path.join(process.cwd(), 'output', 'zalo-credentials.json');
                    returnData[0].json.autoCreateScript = 'node auto-create-zalo-credential.js';
                    returnData[0].json.autoCreateApi = 'Credentials will be created automatically via n8n API if n8n API credentials are provided.';
                }
                else if (selectedCredential === n8nCredential) {
                    returnData[0].json.credentialInstructions = 'Using n8n account credential. New Zalo credentials will be created automatically after successful login.';
                    returnData[0].json.credentialName = selectedCredential.name || 'Unknown';
                    returnData[0].json.credentialId = selectedCredential.id || 'Unknown';
                    returnData[0].json.credentialType = 'n8nZaloApi';
                    returnData[0].json.autoCreateApi = 'Credentials will be created automatically via n8n API after successful login.';
                }
                else {
                    returnData[0].json.credentialInstructions = 'Using existing Zalo credentials from the selected credential.';
                    returnData[0].json.credentialName = selectedCredential.name || 'Unknown';
                    returnData[0].json.credentialId = selectedCredential.id || 'Unknown';
                    returnData[0].json.credentialType = 'zaloApi';
                }
            }
            return [returnData];
        }
        catch (error) {
            if (this.continueOnFail()) {
                const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray({ error: error.message }), { itemData: { item: 0 } });
                return [executionData];
            }
            else {
                throw error;
            }
        }
    }
}
exports.ZaloLoginByQr = ZaloLoginByQr;
//# sourceMappingURL=ZaloLoginByQr.node.js.map