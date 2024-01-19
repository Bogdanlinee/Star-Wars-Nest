const fs = require('fs/promises');

module.exports = class V21705686961789 {
    name = 'V21705686961789';

    async up(queryRunner) {
        let films = await fs.readFile('fetchedEntitiesData/films.json');
        let people = await fs.readFile('fetchedEntitiesData/person.json');
        let species = await fs.readFile('fetchedEntitiesData/species.json');
        let planets = await fs.readFile('fetchedEntitiesData/planets.json');

        let person_film = await fs.readFile('fetchedEntitiesData/relationsTable/person_film.json');
        let species_film = await fs.readFile('fetchedEntitiesData/relationsTable/species_film.json');
        let species_person = await fs.readFile('fetchedEntitiesData/relationsTable/species_person.json');

        // let planets_films = await fs.readFile('fetchedEntitiesData/relationsTable/planets_films.json');
        // let species_planets = await fs.readFile('fetchedEntitiesData/relationsTable/species_planets.json');

        films = JSON.parse(films);
        people = JSON.parse(people);
        species = JSON.parse(species);
        planets = JSON.parse(planets);

        person_film = JSON.parse(person_film);
        species_film = JSON.parse(species_film);
        species_person = JSON.parse(species_person);

        // planets_films = JSON.parse(planets_films);
        // species_planets = JSON.parse(species_planets);

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
        // await queryRunner.manager
        //     .createQueryBuilder()
        //     .insert()
        //     .into('planets_films')
        //     .values(planets_films)
        //     .execute()
        // await queryRunner.manager
        //     .createQueryBuilder()
        //     .insert()
        //     .into('species_planets')
        //     .values(species_planets)
        //     .execute()
    }

    async down(queryRunner) {
        await queryRunner.query('DELETE from person_film')
        await queryRunner.query('DELETE from species_film')
        await queryRunner.query('DELETE from species_person')
        await queryRunner.query('DELETE from film')
        await queryRunner.query('DELETE from person')
        await queryRunner.query('DELETE from species')
        await queryRunner.query('DELETE from planet')
        // await queryRunner.query('DELETE from planets_films')
        // await queryRunner.query('DELETE from species_planets')
    }
}