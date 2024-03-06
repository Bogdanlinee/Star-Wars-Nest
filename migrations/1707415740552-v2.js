const fs = require('fs/promises');

module.exports = class V21707415740552 {
    name = 'V21707415740552';
    directPath = 'fetchedEntitiesData/';
    relationsPath = 'fetchedEntitiesData/relationsTable/';
    entities = {
        Film: 'films.json',
        Species: 'species.json',
        Planet: 'planets.json',
        Person: 'person.json',
        Starship: 'starships.json',
        Vehicle: 'vehicles.json'
    }
    relations = {
        person_film: 'person_film.json',
        species_film: 'species_film.json',
        species_person: 'species_person.json',
        planet_film: 'planets_films.json',
        starships_film: 'starships_film.json',
        starships_person: 'starships_person.json',
        vehicles_person: 'vehicles_person.json',
        vehicles_film: 'vehicles_film.json'
    }

    async up(queryRunner) {
        for (const item in this.entities) {
            let data = await fs.readFile(this.directPath + this.entities[item]);
            data = JSON.parse(data);
            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into(item)
                .values(data)
                .execute()
        }

        for (const item in this.relations) {
            let data = await fs.readFile(this.relationsPath + this.relations[item]);
            data = JSON.parse(data);
            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into(item)
                .values(data)
                .execute()
        }
    }

    async down(queryRunner) {
        await queryRunner.query('DELETE from person_film');
        await queryRunner.query('DELETE from species_film');
        await queryRunner.query('DELETE from species_person');
        await queryRunner.query('DELETE from planet_film');
        await queryRunner.query('DELETE from starships_film');
        await queryRunner.query('DELETE from starships_person');
        await queryRunner.query('DELETE from vehicles_person');
        await queryRunner.query('DELETE from vehicles_film');
        await queryRunner.query('DELETE from film');
        await queryRunner.query('DELETE from person');
        await queryRunner.query('DELETE from species');
        await queryRunner.query('DELETE from planet');
        await queryRunner.query('DELETE from starship');
        await queryRunner.query('DELETE from vehicle');
    }
}