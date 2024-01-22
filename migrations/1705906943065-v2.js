const fs = require('fs/promises');

module.exports = class V21705906943065 {
    name = 'V21705906943065';

    async up(queryRunner) {
        let films = await fs.readFile('fetchedEntitiesData/films.json');
        let people = await fs.readFile('fetchedEntitiesData/person.json');
        let species = await fs.readFile('fetchedEntitiesData/species.json');
        let planets = await fs.readFile('fetchedEntitiesData/planets.json');

        let person_film = await fs.readFile('fetchedEntitiesData/relationsTable/person_film.json');
        let species_film = await fs.readFile('fetchedEntitiesData/relationsTable/species_film.json');
        let species_person = await fs.readFile('fetchedEntitiesData/relationsTable/species_person.json');
        let planet_film = await fs.readFile('fetchedEntitiesData/relationsTable/planets_films.json');
        let planet_species = await fs.readFile('fetchedEntitiesData/relationsTable/planets_species.json');

        films = JSON.parse(films);
        people = JSON.parse(people);
        species = JSON.parse(species);
        planets = JSON.parse(planets);

        person_film = JSON.parse(person_film);
        species_film = JSON.parse(species_film);
        species_person = JSON.parse(species_person);
        planet_film = JSON.parse(planet_film);
        planet_species = JSON.parse(planet_species);

        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('Film')
            .values(films)
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
            .into('Planet')
            .values(planets)
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
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('planet_film')
            .values(planet_film)
            .execute()
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('planet_species')
            .values(planet_species)
            .execute()
    }

    async down(queryRunner) {
        await queryRunner.query('DELETE from person_film')
        await queryRunner.query('DELETE from species_film')
        await queryRunner.query('DELETE from species_person')
        await queryRunner.query('DELETE from film')
        await queryRunner.query('DELETE from person')
        await queryRunner.query('DELETE from species')
        await queryRunner.query('DELETE from planet')
        await queryRunner.query('DELETE from planet_film')
        await queryRunner.query('DELETE from planet_species')
    }
}