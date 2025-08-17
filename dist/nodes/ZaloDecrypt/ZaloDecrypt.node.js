"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloDecrypt = void 0;

const n8n_workflow_1 = require("n8n-workflow");
const ZaloDecryptDescription_1 = require("./ZaloDecryptDescription");
const utils_1 = require("../zalo-sdk/utils");
const cryptojs = require("crypto-js");

class ZaloDecrypt {
    constructor() {
        this.description = {
            displayName: 'Zalo Decrypt',
            name: 'zaloDecrypt',
            icon: 'file:../shared/zalo.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Giải mã chuỗi đã được mã hóa bằng AES',
            defaults: {
                name: 'Zalo Decrypt',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                ...ZaloDecryptDescription_1.zaloDecryptResources,
                ...ZaloDecryptDescription_1.zaloDecryptOperations,
                {
                    displayName: 'Chuỗi đã mã hóa',
                    name: 'encryptedString',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['zaloDecrypt'],
                            operation: ['decryptAES', 'decryptLoginInfo'],
                        },
                    },
                    description: 'Chuỗi đã được mã hóa cần giải mã',
                },
                {
                    displayName: 'Secret Key',
                    name: 'secretKey',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['zaloDecrypt'],
                            operation: ['decryptAES', 'decryptLoginInfo'],
                        },
                    },
                    description: 'Secret key dùng để giải mã (Base64)',
                },
                {
                    displayName: 'Cookie',
                    name: 'cookie',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['zaloDecrypt'],
                            operation: ['decryptLoginInfo'],
                        },
                    },
                    description: 'Cookie zpw_sek để trích xuất key giải mã',
                },
            
                // Thêm trường nhập cho getEncryptKey
                {
                    displayName: 'ZCID',
                    name: 'zcid',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['zaloDecrypt'],
                            operation: ['getEncryptKey'],
                        },
                    },
                    description: 'Giá trị zcid đã lưu từ phiên đăng nhập',
                },
                {
                    displayName: 'ZCID EXT',
                    name: 'zcid_ext',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['zaloDecrypt'],
                            operation: ['getEncryptKey'],
                        },
                    },
                    description: 'Giá trị zcid_ext đã lưu từ phiên đăng nhập',
                },
            ],
        };
    }

    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);

        for (let i = 0; i < items.length; i++) {
            try {
                // Thêm xử lý cho operation getEncryptKey
                if (resource === 'zaloDecrypt' && operation === 'getEncryptKey') {
                    const zcid = this.getNodeParameter('zcid', i);
                    const zcid_ext = this.getNodeParameter('zcid_ext', i);

                    // Hàm tách ký tự chẵn/lẻ
                    function processStr(str) {
                        const even = [];
                        const odd = [];
                        for (let i = 0; i < str.length; i++) {
                            (i % 2 === 0 ? even : odd).push(str[i]);
                        }
                        return { even, odd };
                    }

                    // Tính MD5 zcid_ext (chữ hoa)
                    const md5_zcid_ext = cryptojs.MD5(zcid_ext).toString().toUpperCase();
                    const n = processStr(md5_zcid_ext).even;
                    const { even: a, odd: s } = processStr(zcid);
                    const part1 = n.slice(0, 8).join('');
                    const part2 = a.slice(0, 12).join('');
                    const part3 = s.reverse().slice(0, 12).join('');
                    const encryptKey = part1 + part2 + part3;

                    returnData.push({
                        json: {
                            success: true,
                            zcid,
                            zcid_ext,
                            encryptKey,
                        },
                    });
                    continue;
                }
                if (resource === 'zaloDecrypt') {
                    if (operation === 'decryptLoginInfo') {
                        const encryptedString = this.getNodeParameter('encryptedString', i);
                        const secretKey = this.getNodeParameter('secretKey', i);
                        const cookie = this.getNodeParameter('cookie', i);
                        
                        this.logger.info('Đang giải mã dữ liệu getLoginInfo');
                        
                        try {
                            // Thử giải mã với các phương pháp khác nhau
                            let decryptedData = null;
                            let method = '';
                            
                            // Phương pháp 1: Sử dụng decryptResp từ utils (như trong login.js)
                            try {
                                decryptedData = utils_1.decryptResp(secretKey, encryptedString);
                                method = 'decryptResp';
                                this.logger.info('Giải mã thành công với decryptResp');
                            } catch (error) {
                                this.logger.info('Không thể giải mã với decryptResp:', error.message);
                            }
                            
                            // Phương pháp 2: Sử dụng decodeAES nếu phương pháp 1 thất bại
                            if (!decryptedData) {
                                try {
                                    const decoded = utils_1.decodeAES(secretKey, encryptedString);
                                    if (decoded) {
                                        try {
                                            decryptedData = JSON.parse(decoded);
                                            method = 'decodeAES';
                                            this.logger.info('Giải mã thành công với decodeAES');
                                        } catch (parseError) {
                                            this.logger.info('Giải mã thành công nhưng không phải JSON hợp lệ');
                                            decryptedData = decoded;
                                            method = 'decodeAES (raw string)';
                                        }
                                    }
                                } catch (error) {
                                    this.logger.info('Không thể giải mã với decodeAES:', error.message);
                                }
                            }
                            
                            // Phương pháp 3: Thử trực tiếp với crypto-js
                            if (!decryptedData) {
                                try {
                                    // Kiểm tra định dạng key và data
                                    const isBase64Key = /^[A-Za-z0-9+/=]+$/.test(secretKey);
                                    const isBase64Data = /^[A-Za-z0-9+/=]+$/.test(encryptedString);
                                    
                                    this.logger.info(`Key là base64: ${isBase64Key}, Data là base64: ${isBase64Data}`);
                                    
                                    if (isBase64Key && isBase64Data) {
                                        let keyBytes = cryptojs.enc.Base64.parse(secretKey);
                                        let decrypted = cryptojs.AES.decrypt({
                                            ciphertext: cryptojs.enc.Base64.parse(encryptedString)
                                        }, keyBytes, {
                                            iv: cryptojs.enc.Hex.parse("00000000000000000000000000000000"),
                                            mode: cryptojs.mode.CBC,
                                            padding: cryptojs.pad.Pkcs7
                                        });
                                        
                                        const decryptedStr = decrypted.toString(cryptojs.enc.Utf8);
                                        if (decryptedStr) {
                                            try {
                                                decryptedData = JSON.parse(decryptedStr);
                                                method = 'crypto-js';
                                                this.logger.info('Giải mã thành công với crypto-js');
                                            } catch (parseError) {
                                                this.logger.info('Giải mã thành công nhưng không phải JSON hợp lệ');
                                                decryptedData = decryptedStr;
                                                method = 'crypto-js (raw string)';
                                            }
                                        }
                                    } else {
                                        this.logger.info('Key hoặc data không phải base64, không thể giải mã với crypto-js');
                                    }
                                } catch (error) {
                                    this.logger.info('Không thể giải mã với crypto-js:', error.message);
                                }
                            }
                            
                            // Phương pháp 4: Thử trích xuất key từ cookie và giải mã
                            if (!decryptedData && cookie) {
                                try {
                                    // Trích xuất key từ cookie
                                    let extractedKey = cookie;
                                    if (cookie.includes('zpw_sek=')) {
                                        extractedKey = cookie.split('zpw_sek=')[1].split(';')[0];
                                    }
                                    
                                    this.logger.info('Đang thử với key từ cookie:', extractedKey.substring(0, 20) + '...');
                                    
                                    // Thử giải mã với key từ cookie
                                    const decrypted = utils_1.decryptResp(extractedKey, encryptedString);
                                    if (decrypted) {
                                        decryptedData = decrypted;
                                        method = 'decryptResp with cookie key';
                                        this.logger.info('Giải mã thành công với key từ cookie');
                                    }
                                } catch (error) {
                                    this.logger.info('Không thể giải mã với key từ cookie:', error.message);
                                }
                            }
                            
                            if (decryptedData) {
                                returnData.push({
                                    json: {
                                        success: true,
                                        method,
                                        data: decryptedData,
                                        secretKey: decryptedData.zpw_enk || null,
                                        uid: decryptedData.uid || null
                                    },
                                });
                            } else {
                                throw new Error('Không thể giải mã dữ liệu với các phương pháp đã thử');
                            }
                            
                        } catch (error) {
                            this.logger.error('Lỗi khi giải mã getLoginInfo:', error.message);
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Không thể giải mã dữ liệu getLoginInfo: ${error.message}`);
                        }
                    }
                    else if (operation === 'decryptAES') {
                        const encryptedString = this.getNodeParameter('encryptedString', i);
                        const secretKey = this.getNodeParameter('secretKey', i);

                        this.logger.info('Đang giải mã chuỗi với secret key');
                        
                        try {
                            // Sử dụng hàm decodeAES từ utils
                            const decrypted = utils_1.decodeAES(secretKey, encryptedString);
                            
                            // Nếu kết quả là chuỗi JSON, thử parse thành đối tượng
                            let parsedResult = decrypted;
                            try {
                                parsedResult = JSON.parse(decrypted);
                            } catch (parseError) {
                                // Nếu không phải JSON, giữ nguyên chuỗi
                                this.logger.info('Kết quả không phải JSON, giữ nguyên dạng chuỗi');
                            }

                            this.logger.info('Giải mã thành công');
                            
                            returnData.push({
                                json: {
                                    success: true,
                                    data: parsedResult,
                                    raw: decrypted
                                },
                            });
                        } catch (decryptError) {
                            this.logger.error('Lỗi khi giải mã:', decryptError);
                            
                            // Thử phương pháp giải mã thứ hai sử dụng decryptResp
                            try {
                                const decrypted = utils_1.decryptResp(secretKey, encryptedString);
                                
                                this.logger.info('Giải mã thành công với phương pháp thứ hai');
                                
                                returnData.push({
                                    json: {
                                        success: true,
                                        data: decrypted,
                                        method: 'decryptResp'
                                    },
                                });
                            } catch (error) {
                                this.logger.error('Không thể giải mã với cả hai phương pháp:', error);
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Không thể giải mã chuỗi: ${error.message}`);
                            }
                        }
                    }
                    else if (operation === 'getEncryptKey') {
                        const zcid = this.getNodeParameter('zcid', i);
                        const zcid_ext = this.getNodeParameter('zcid_ext', i);
                    
                        function processStr(str) {
                            const even = [];
                            const odd = [];
                            for (let i = 0; i < str.length; i++) {
                                (i % 2 === 0 ? even : odd).push(str[i]);
                            }
                            return { even, odd };
                        }
                    
                        const md5_zcid_ext = cryptojs.MD5(zcid_ext).toString().toUpperCase();
                        const n = processStr(md5_zcid_ext).even;
                        const { even: a, odd: s } = processStr(zcid);
                    
                        const part1 = n.slice(0, 8).join('');
                        const part2 = a.slice(0, 12).join('');
                        const part3 = s.reverse().slice(0, 12).join('');
                        const encryptKey = part1 + part2 + part3;
                    
                        returnData.push({
                            json: {
                                success: true,
                                zcid,
                                zcid_ext,
                                encryptKey,
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
                    continue;
                }
                throw error;
            }
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}

exports.ZaloDecrypt = ZaloDecrypt;
