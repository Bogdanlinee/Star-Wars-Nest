const {DataSource} = require('typeorm')

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
}

export {dbConfig};

export default new DataSource(dbConfig);