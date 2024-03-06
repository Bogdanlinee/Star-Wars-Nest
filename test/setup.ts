const util = require('util');
const exec = util.promisify(require('child_process').exec);

global.beforeAll(async () => {
    await exec('NODE_ENV=test npm run typeorm migration:run -- -d ./ormconfig.js');
}, 15000);

global.afterAll(async () => {
    await exec('NODE_ENV=test npm run typeorm schema:drop -- -d ./ormconfig.js');
}, 15000);