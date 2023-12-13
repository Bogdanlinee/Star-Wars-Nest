import {MigrationInterface, QueryRunner} from "typeorm";
import {Person} from '../src/people/entities/person.entity';

export class V21702448852052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let people: Person[] = [];

        await getPeopleRequest('https://swapi.dev/api/people/')

        async function getPeopleRequest(url: string) {
            try {
                const request = await fetch(url);

                if (request.status !== 200) return;

                const data = await request.json();
                const personList = await data.results;

                if (!personList.length) return;

                people = [...people, ...personList];

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
            .into(Person)
            .values(people)
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM person");
    }

}