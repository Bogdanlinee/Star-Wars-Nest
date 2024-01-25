import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {IsArray} from 'class-validator';

describe('Planets (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Can create one planet', () => {
        return request(app.getHttpServer())
            .post(`/planets`)
            .send({
                name: "Corellia",
                rotation_period: "25",
                orbital_period: "329",
                diameter: "11000",
                climate: "temperate",
                gravity: "1 standard",
                terrain: "plains, urban, hills, forests",
                surface_water: "70",
                population: "3000000000",
                url: "https://swapi.dev/api/planets/22/",
                residentIds: [1],
                speciesIds: [1],
                filmIds: [1]
            })
            .expect(201)
            .then(res => {
                const {id, residents, species, films} = res.body;
                expect(residents.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(films.length).toBeGreaterThan(0);
                expect(id).toBeDefined();
            })
    });

    it('Can find one planet', () => {
        const planetId = 7;
        return request(app.getHttpServer())
            .get(`/planets/${planetId}`)
            .expect(200)
            .then(res => {
                const {id, residents, species, films} = res.body;
                expect(id).toEqual(planetId);
                expect(residents.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(films.length).toBeGreaterThan(0);
            })
    });

    it('Throws Error. Find one planet in DB', () => {
        const planetId = 10000000;
        return request(app.getHttpServer())
            .get(`/planets/${planetId}`)
            .expect(404)
    });

    it('Can find many planets', () => {
        return request(app.getHttpServer())
            .get(`/planets`)
            .expect(200)
            .then(res => {
                const planetsList = res.body;
                expect(planetsList.length).toBeTruthy();
                expect(planetsList[0]['residents'].length).toBeGreaterThan(0);
                expect(planetsList[0]['species'].length).toBeGreaterThan(0);
                expect(planetsList[0]['films'].length).toBeGreaterThan(0);
            })
    });

    it('Can update the planet', () => {
        const planetId = 7;
        const planetUpdatedInfo = {
            name: 'New planet Title',
            residentIds: [1, 2, 3],
            speciesIds: [1, 2, 3],
            filmIds: [1, 2, 3],
        };
        return request(app.getHttpServer())
            .patch(`/planets/${planetId}`)
            .send(planetUpdatedInfo)
            .expect(200)
            .then(res => {
                const {name, residents, species, films} = res.body;
                expect(name).toEqual(planetUpdatedInfo.name);
                expect(residents.length).toEqual(planetUpdatedInfo.residentIds.length);
                expect(species.length).toEqual(planetUpdatedInfo.speciesIds.length);
                expect(films.length).toEqual(planetUpdatedInfo.filmIds.length);
            })
    })

    it('Can delete one planet', () => {
        const planetId = 1;
        return request(app.getHttpServer())
            .delete(`/planets/${planetId}`)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body;
                expect(deletedAt).toBeTruthy();
            })
    })
});