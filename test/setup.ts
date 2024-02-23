import db from '../ormconfig';
import mockUsers from '../src/mocks/user/mockUser';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

global.beforeAll(async () => {
    await exec('NODE_ENV=test npm run typeorm migration:run -- -d ./ormconfig.js');

    const connectedDb = await db.initialize()

    connectedDb.createQueryBuilder()

    await connectedDb.createQueryBuilder()
        .createQueryBuilder()
        .insert()
        .into('user')
        .values([mockUsers.adminRole, mockUsers.userRole])
        .execute()

    await connectedDb.destroy();
}, 15000);

global.afterAll(async () => {
    await exec('NODE_ENV=test npm run typeorm schema:drop -- -d ./ormconfig.js');
}, 15000);