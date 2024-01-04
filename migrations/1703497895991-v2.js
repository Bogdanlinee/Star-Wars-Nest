const {MigrationInterface, QueryRunner} = require('typeorm');

module.exports = class V1703497895991 {
    name = 'V1703497895991'

    async up(queryRunner) {
        let people = [];

        await getPeopleRequest('https://swapi.dev/api/people/')

        async function getPeopleRequest(url) {
            try {
                const request = await fetch(url);

                if (request.status !== 200) return;

                const data = await request.json();
                const personList = await data.results;

                if (!personList.length) return;

                people = [...people, ...personList];

                return;

                if (!data.next) return;

                await getPeopleRequest(data.next);
            } catch (err) {
                console.log(err);
            }
        }

        if (!people.length) return;

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