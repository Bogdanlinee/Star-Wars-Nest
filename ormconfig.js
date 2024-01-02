const {DataSource} = require('typeorm')

const dbConfig = {
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
        dbConfig.database = 'Test1';
        dbConfig.entities = ['**/*.entity.js'];
        break;
    case 'test':
        dbConfig.database = 'Test2';
        dbConfig.entities = ['**/*.entity.ts'];
        dbConfig.migrationsRun = true;
        break;
}

export {dbConfig};

export default new DataSource(dbConfig);