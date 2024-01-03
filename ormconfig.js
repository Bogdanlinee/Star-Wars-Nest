const {DataSource} = require('typeorm')

let dbConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    synchronize: false,
    migrations: ['migrations/*.js'],
    migrationsTableName: 'migrations'
}

switch (process.env.NODE_ENV) {
    case 'development':
        dbConfig = {
            type: 'mysql',
            database: 'Test1',
            host: 'localhost',
            entities: ['**/*.entity.js'],
            port: 3306,
            username: 'root',
            password: 'root',
            synchronize: false,
            migrations: ['migrations/*.js'],
            migrationsTableName: 'migrations'
        }
        break;
    case 'test':
        dbConfig = {
            type: 'mysql',
            database: 'Test2',
            host: 'localhost',
            entities: ['**/*.entity.ts'],
            port: 3306,
            username: 'root',
            password: 'root',
            synchronize: false,
            migrations: ['migrations/*.js'],
            migrationsTableName: 'migrations'
        }
        break;
}

export {dbConfig};

export default new DataSource(dbConfig);