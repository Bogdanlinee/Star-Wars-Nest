const {MigrationInterface, QueryRunner} = require('typeorm');
const fs = require('fs/promises');

module.exports = class V21705042977190 {
    name = 'V21705042977190';

    async up(queryRunner) {
        let films = await fs.readFile('fetchedEntitiesData/films.json');
        let people = await fs.readFile('fetchedEntitiesData/person.json');
        let person_film = await fs.readFile('fetchedEntitiesData/person_film.json');

        films = JSON.parse(films);
        people = JSON.parse(people);
        person_film = JSON.parse(person_film);

        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('Film')
            .values(films)
            .execute()
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('Person')
            .values(people)
            .execute()
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('person_film')
            .values(person_film)
            .execute()
    }

    async down(queryRunner) {
        await queryRunner.query('DELETE from film')
        await queryRunner.query('DELETE from person')
        await queryRunner.query('DELETE from person_film')
    }
}