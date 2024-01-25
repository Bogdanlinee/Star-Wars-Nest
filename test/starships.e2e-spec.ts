import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {IsArray} from 'class-validator';

describe('Starships (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Can create one starship', () => {
        return request(app.getHttpServer())
            .post(`/starships`)
            .send({
                name: "CR90 corvette",
                model: "CR90 corvette",
                manufacturer: "Corellian Engineering Corporation",
                cost_in_credits: "3500000",
                length: "150",
                max_atmosphering_speed: "950",
                crew: "30-165",
                passengers: "600",
                cargo_capacity: "3000000",
                consumables: "1 year",
                hyperdrive_rating: "2.0",
                MGLT: "60",
                starship_class: "corvette",
                pilotsIds: [1],
                filmsIds: [1],
                url: "https://swapi.dev/api/starships/2/"
            })
            .expect(201)
            .then(res => {
                const {id, pilots, films} = res.body;
                expect(pilots.length).toBeGreaterThan(0);
                expect(films.length).toBeGreaterThan(0);
                expect(id).toBeDefined();
            })
    });

    it('Can find one starship', () => {
        const starshipId = 10;
        return request(app.getHttpServer())
            .get(`/starships/${starshipId}`)
            .expect(200)
            .then(res => {
                const {id, pilots, films} = res.body;
                expect(id).toEqual(starshipId);
                expect(pilots.length).toBeGreaterThan(0);
                expect(films.length).toBeGreaterThan(0);
            })
    });

    it('Throws Error. Find one starship in DB', () => {
        const starshipId = 10000000;
        return request(app.getHttpServer())
            .get(`/starships/${starshipId}`)
            .expect(404)
    });

    it('Can find many starships', () => {
        return request(app.getHttpServer())
            .get(`/starships`)
            .expect(200)
            .then(res => {
                const starshipsList = res.body;
                expect(starshipsList.length).toBeTruthy();
                expect(starshipsList[0]['pilots'].length).toBeGreaterThan(0);
                expect(starshipsList[0]['films'].length).toBeGreaterThan(0);
            })
    });

    it('Can update the starship', () => {
        const starshipId = 10;
        const starshipUpdatedInfo = {
            name: 'New starship Title',
            pilotsIds: [1, 2, 3],
            filmsIds: [1, 2, 3],
        };
        return request(app.getHttpServer())
            .patch(`/starships/${starshipId}`)
            .send(starshipUpdatedInfo)
            .expect(200)
            .then(res => {
                const {name, pilots, films} = res.body;
                expect(name).toEqual(starshipUpdatedInfo.name);
                expect(pilots.length).toEqual(starshipUpdatedInfo.pilotsIds.length);
                expect(films.length).toEqual(starshipUpdatedInfo.filmsIds.length);
            })
    })

    it('Can delete one starship', () => {
        const starshipId = 2;
        return request(app.getHttpServer())
            .delete(`/starships/${starshipId}`)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body;
                expect(deletedAt).toBeTruthy();
            })
    })
});