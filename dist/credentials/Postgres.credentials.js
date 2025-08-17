"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgres = void 0;
class Postgres {
    constructor() {
        this.name = 'zaloPostgres';
        this.displayName = 'Zalo PostgreSQL Credentials';
        this.documentationUrl = 'https://docs.n8n.io/credentials/postgres/';
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
                default: 5432,
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
exports.Postgres = Postgres;
