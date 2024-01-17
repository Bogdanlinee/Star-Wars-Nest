const fs = require('fs/promises');

module.exports = class V21705394756597 {
    name = 'V21705394756597';

    async up(queryRunner) {
        let films = await fs.readFile('fetchedEntitiesData/films.json');
        let people = await fs.readFile('fetchedEntitiesData/person.json');
        let species = await fs.readFile('fetchedEntitiesData/species.json');

        let person_film = await fs.readFile('fetchedEntitiesData/relationsTable/person_film.json');
        let species_film = await fs.readFile('fetchedEntitiesData/relationsTable/species_film.json');
        let species_person = await fs.readFile('fetchedEntitiesData/relationsTable/species_person.json');

        films = JSON.parse(films);
        people = JSON.parse(people);
        species = JSON.parse(species);

        person_film = JSON.parse(person_film);
        species_film = JSON.parse(species_film);
        species_person = JSON.parse(species_person);

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
            .into('Species')
            .values(species)
            .execute()
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('person_film')
            .values(person_film)
            .execute()
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('species_film')
            .values(species_film)
            .execute()
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('species_person')
            .values(species_person)
            .execute()
    }

    async down(queryRunner) {
        await queryRunner.query('DELETE from film')
        await queryRunner.query('DELETE from person')
        await queryRunner.query('DELETE from species')
        await queryRunner.query('DELETE from person_film')
        await queryRunner.query('DELETE from species_film')
        await queryRunner.query('DELETE from species_person')
    }
}
