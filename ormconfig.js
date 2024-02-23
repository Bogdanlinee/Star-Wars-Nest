const {DataSource} = require('typeorm');

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
        dbConfig.database = 'Star_Wars';
        dbConfig.entities = ['**/*.entity.js'];
        break;
    case 'test':
        dbConfig.database = 'Test_Star_Wars';
        dbConfig.entities = ['**/*.entity.ts'];
        break;
    default :
        throw new Error('Unknown Environment');
}

export {dbConfig};

export default new DataSource(dbConfig);