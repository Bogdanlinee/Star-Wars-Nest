const users = require('../fetchedEntitiesData/users.json')

module.exports = class V61709185756585 {
    async up(queryRunner) {
        console.log(users);
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('User')
            .values(users)
            .execute()
    }

    async down(queryRunner) {
        await queryRunner.query('DELETE from user');
    }
}
