"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySql = void 0;
class MySql {
    constructor() {
        this.name = 'zaloMySql';
        this.displayName = 'Zalo MySQL Credentials';
        this.documentationUrl = 'https://docs.n8n.io/credentials/mysql/';
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
                default: 3306,
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
                name: 'database',
                type: 'string',
                default: '',
            },
            {
                displayName: 'SSL',
                name: 'ssl',
                type: 'boolean',
                default: false,
            },
        ];
    }
}
exports.MySql = MySql;
