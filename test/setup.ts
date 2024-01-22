const {execSync} = require('child_process');

global.beforeAll(async () => {
    execSync('NODE_ENV=test npm run typeorm migration:run -- -d ./ormconfig.js');
});

global.afterAll(async () => {
    execSync('NODE_ENV=test npm run typeorm schema:drop -- -d ./ormconfig.js');
});