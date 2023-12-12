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

// 'typeorm':'ts-node ./node_modules/typeorm/cli',
//     'typeorm:run-migrations':'cross-env NODE_ENV=development ts-node ./node_modules/typeorm/cli migration:run -- -d ./ormconfig.js',
//     'typeorm:generate-migration':'cross-env NODE_ENV=development ts-node ./node_modules/typeorm/cli -- -d ./ormconfig.js migration:generate ./migrations/migrationName',
//     'typeorm:revert-migration':'cross-env NODE_ENV=development ts-node ./node_modules/typeorm/cli -- -d ./typeOrm.config.ts migration:revert'