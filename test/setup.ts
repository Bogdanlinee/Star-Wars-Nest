const {execSync} = require('child_process');

global.beforeEach(async () => {
    execSync('npm run typeorm migration:run -- -d ./ormconfig.js');
});

global.afterEach(async () => {
    execSync('npm run typeorm schema:drop -- -d ./ormconfig.js');
});