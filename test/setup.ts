const {execSync} = require('child_process');

global.beforeEach(async () => {
    execSync('NODE_ENV=test npm run typeorm migration:run -- -d ./ormconfig.js');
});

global.afterEach(async () => {
    // execSync('NODE_ENV=test npm run typeorm schema:drop -- -d ./ormconfig.js');
});