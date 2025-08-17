"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRedisClient = void 0;
const redis_1 = require("redis");
function setupRedisClient(credentials) {
    return (0, redis_1.createClient)({
        socket: {
            host: credentials.host,
            port: credentials.port,
            ...(credentials.ssl ? { tls: true } : {}),
        },
        database: credentials.database,
        username: credentials.user || undefined,
        password: credentials.password || undefined,
    });
}
exports.setupRedisClient = setupRedisClient;
