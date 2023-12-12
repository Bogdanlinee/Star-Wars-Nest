"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const { DataSource } = require('typeorm');
const dbConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'Test1',
    entities: ['**/*.entity.js'],
    synchronize: false,
    migrations: ['migrations/*.js'],
    migrationsTableName: 'migrations'
};
exports.dbConfig = dbConfig;
exports.default = new DataSource(dbConfig);
//# sourceMappingURL=ormconfig.js.map