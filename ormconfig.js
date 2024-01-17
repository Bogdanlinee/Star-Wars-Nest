const {DataSource} = require('typeorm')

let dbConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    synchronize: true,
    migrations: ['migrations/*.js'],
    migrationsTableName: 'migrations'
}

switch (process.env.NODE_ENV) {
    case 'development':
        dbConfig.database = 'Test1';
        dbConfig.entities = ['**/*.entity.js'];
        break;
    case 'test':
        dbConfig.database = 'Test2';
        dbConfig.entities = ['**/*.entity.ts'];
        break;
    default :
        throw new Error('Unknown Environment');
}

export {dbConfig};

export default new DataSource(dbConfig);