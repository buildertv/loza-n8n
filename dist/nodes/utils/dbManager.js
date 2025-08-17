"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbOperations = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const redisUtils = require('./redisUtils');
const { Client } = require('pg');
const mysql = require('mysql2/promise');

async function getDbOperations(node) {
    const dbType = node.getNodeParameter('dbType', 0, 'redis');
    let dbClient;

    if (dbType === 'redis') {
        const redisCredentials = await node.getCredentials('redis');
        if (!redisCredentials) {
            throw new n8n_workflow_1.NodeOperationError(node.getNode(), 'Redis credentials are not configured.');
        }
        dbClient = redisUtils.setupRedisClient(redisCredentials);
        await dbClient.connect();
        return {
            get: (key) => dbClient.get(key),
            set: (key, value) => dbClient.set(key, value),
            del: (key) => dbClient.del(key),
            quit: () => dbClient.quit(),
        };
    }

    if (dbType === 'postgres') {
        const postgresCredentials = await node.getCredentials('zaloPostgres');
        if (!postgresCredentials) {
            throw new n8n_workflow_1.NodeOperationError(node.getNode(), 'PostgreSQL credentials are not configured.');
        }
        dbClient = new Client({
            user: postgresCredentials.user,
            host: postgresCredentials.host,
            database: postgresCredentials.database,
            password: postgresCredentials.password,
            port: postgresCredentials.port,
            ssl: postgresCredentials.ssl,
        });
        await dbClient.connect();
        await dbClient.query(`
            CREATE TABLE IF NOT EXISTS n8n_message_collector (
                key VARCHAR(255) PRIMARY KEY,
                value TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        return {
            get: async (key) => {
                const res = await dbClient.query('SELECT value FROM n8n_message_collector WHERE key = $1', [key]);
                return res.rows[0]?.value || null;
            },
            set: (key, value) => dbClient.query('INSERT INTO n8n_message_collector (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2, created_at = CURRENT_TIMESTAMP', [key, value]),
            del: (key) => dbClient.query('DELETE FROM n8n_message_collector WHERE key = $1', [key]),
            quit: () => dbClient.end(),
        };
    }

    if (dbType === 'mysql') {
        const mysqlCredentials = await node.getCredentials('zaloMySql');
        if (!mysqlCredentials) {
            throw new n8n_workflow_1.NodeOperationError(node.getNode(), 'MySQL credentials are not configured.');
        }
        dbClient = await mysql.createConnection({
            host: mysqlCredentials.host,
            user: mysqlCredentials.user,
            password: mysqlCredentials.password,
            database: mysqlCredentials.database,
            port: mysqlCredentials.port,
            ssl: mysqlCredentials.ssl,
        });
        await dbClient.execute(`
            CREATE TABLE IF NOT EXISTS n8n_message_collector (
                \`key\` VARCHAR(255) PRIMARY KEY,
                \`value\` TEXT,
                \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
        return {
            get: async (key) => {
                const [rows] = await dbClient.execute('SELECT `value` FROM n8n_message_collector WHERE `key` = ?', [key]);
                return rows[0]?.value || null;
            },
            set: (key, value) => dbClient.execute('INSERT INTO n8n_message_collector (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?', [key, value, value]),
            del: (key) => dbClient.execute('DELETE FROM n8n_message_collector WHERE `key` = ?', [key]),
            quit: () => dbClient.end(),
        };
    }

    throw new n8n_workflow_1.NodeOperationError(node.getNode(), `Database type "${dbType}" is not supported.`);
}
exports.getDbOperations = getDbOperations;