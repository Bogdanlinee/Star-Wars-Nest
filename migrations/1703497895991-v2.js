const {MigrationInterface, QueryRunner} = require('typeorm');
const fs = require('fs/promises');

module.exports = class V1703497895991 {
    name = 'V1703497895991'

    async up(queryRunner) {
        let people = await fs.readFile('fetchedEntitiesData/people.json');

        console.log(people);

        people = JSON.parse(people);

        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('Person')
            .values(people)
            .execute()
    }

    async down(queryRunner) {
        await queryRunner.query('DELETE from person')
    }
}