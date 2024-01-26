import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';

describe('Films (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Can create one film', () => {
        return request(app.getHttpServer())
            .post(`/films`)
            .send({
                title: "Test Film",
                episode_id: 1,
                opening_crawl: "Test description",
                director: "George Lucas",
                producer: "Rick McCallum",
                release_date: "1999-05-19",
                url: "https://swapi.dev/api/films/4/",
                personIds: [1],
                speciesIds: [1],
                planetIds: [1],
                starshipIds: [2],
                vehicleIds: [],
            })
            .expect(201)
            .then(res => {
                const {characters, species, planets, starships, vehicles} = res.body;
                expect(characters.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(planets.length).toBeGreaterThan(0);
                expect(starships.length).toBeGreaterThan(0);
                // expect(vehicles.length).toBeGreaterThan(0);
            })
    }, 80000);

    // it('Can find one film', () => {
    //     const filmId = 1;
    //     return request(app.getHttpServer())
    //         .get(`/films/${filmId}`)
    //         .expect(200)
    //         .then(res => {
    //             const {id, title, species, characters, planets, starships, vehicles} = res.body;
    //             expect(id).toEqual(filmId);
    //             expect(species.length).toBeGreaterThan(0);
    //             expect(characters.length).toBeGreaterThan(0);
    //             expect(planets.length).toBeGreaterThan(0);
    //             expect(starships.length).toBeGreaterThan(0);
    //             // expect(vehicles.length).toBeGreaterThan(0);
    //             expect(title).toBeDefined();
    //         })
    // }, 80000);

    it('Throws Error. Find one film in DB', () => {
        const filmId = 10000000;
        return request(app.getHttpServer())
            .get(`/films/${filmId}`)
            .expect(404)
    }, 80000);

    it('Can find many films', () => {
        return request(app.getHttpServer())
            .get(`/films`)
            .expect(200)
            .then(res => {
                const filmsList = res.body;
                expect(filmsList.length).toBeTruthy();
                expect(filmsList[0]['characters'].length).toBeGreaterThan(0);
                expect(filmsList[0]['species'].length).toBeGreaterThan(0);
                expect(filmsList[0]['planets'].length).toBeGreaterThan(0);
                expect(filmsList[0]['starships'].length).toBeGreaterThan(0);
                // expect(filmsList[0]['vehicles'].length).toBeGreaterThan(0);
            })
    }, 80000);

    it('Can update the film', () => {
        const filmId = 1;
        const filmUpdatedInfo = {
            title: 'New Film Title',
            speciesIds: [1, 2, 3],
            personIds: [1, 2, 3],
            planetIds: [1, 2, 3],
            starshipIds: [2, 3, 5],
            // vehicleIds: [4, 6, 7],
        };
        return request(app.getHttpServer())
            .patch(`/films/${filmId}`)
            .send(filmUpdatedInfo)
            .expect(200)
            .then(res => {
                const {title, species, characters, planets, starships, vehicles} = res.body;
                expect(title).toEqual(filmUpdatedInfo.title);
                expect(species.length).toEqual(filmUpdatedInfo.speciesIds.length);
                expect(characters.length).toEqual(filmUpdatedInfo.personIds.length);
                expect(planets.length).toEqual(filmUpdatedInfo.planetIds.length);
                expect(starships.length).toEqual(filmUpdatedInfo.starshipIds.length);
                // expect(vehicles.length).toEqual(filmUpdatedInfo.vehicleIds.length);
            })
    }, 80000);

    it('Can delete one film', () => {
        const filmId = 1;
        return request(app.getHttpServer())
            .delete(`/films/${filmId}`)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body;
                expect(deletedAt).toBeTruthy();
            })
    }, 80000);
});