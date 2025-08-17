"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis = void 0;
class Redis {
    constructor() {
        this.name = 'redis';
        this.displayName = 'Zalo Redis Credentials';
        this.documentationUrl = 'https://docs.n8n.io/credentials/redis/';
        this.properties = [
            {
                displayName: 'Host',
                name: 'host',
                type: 'string',
                default: 'localhost',
            },
            {
                displayName: 'Port',
                name: 'port',
                type: 'number',
                default: 6379,
            },
            {
                displayName: 'User',
                name: 'user',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Password',
                name: 'password',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
            },
            {
                displayName: 'Database',
                name: 'db',
                type: 'number',
                default: 0,
            },
        ];
    }
}
exports.Redis = Redis;
