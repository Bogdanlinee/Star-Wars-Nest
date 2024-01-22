import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';

describe('People (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Can create one person', () => {
        return request(app.getHttpServer())
            .post(`/people`)
            .send({
                name: "Test name",
                height: "120",
                mass: "85",
                hair_color: "blond",
                skin_color: "fair",
                eye_color: "blue",
                birth_year: "19BBY",
                gender: "male",
                url: "https://swapi.dev/api/people/1/",
                images: [],
                filmIds: [1],
                speciesIds: [1],
                homeworldId: 1
            })
            .expect(201)
            .then(res => {
                const {name, films, species, homeworld} = res.body;
                expect(films.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(homeworld.id).toBeDefined();
                expect(name).toBeDefined();
            })
    });

    it('Can find one person', () => {
        const personId = 2;
        return request(app.getHttpServer())
            .get(`/people/${personId}`)
            .expect(200)
            .then(res => {
                const {id, name, films, species, homeworld} = res.body;
                expect(id).toEqual(personId);
                expect(films.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(name).toBeDefined();
                expect(homeworld.url).toBeDefined();
            })
    });

    it('Throws Error. Find one person in DB', () => {
        const personId = 10000000;
        return request(app.getHttpServer())
            .get(`/people/${personId}`)
            .expect(404)
    });

    it('Can find many people', () => {
        return request(app.getHttpServer())
            .get(`/people`)
            .expect(200)
            .then(res => {
                const peopleList = res.body;
                expect(peopleList.length).toBeTruthy();
                expect(peopleList[0]['films'].length).toBeGreaterThan(0);
                expect(peopleList[0]['species'].length).toBeGreaterThan(0);
                expect(peopleList[0]['homeworld']['url']).toBeDefined();
            })
    });

    it('Can update the person', () => {
        const personId = 2;
        const personUpdatedInfo = {name: 'New Test Name'};
        return request(app.getHttpServer())
            .patch(`/people/${personId}`)
            .send(personUpdatedInfo)
            .expect(200)
            .then(res => {
                const {name, films, species, homeworld} = res.body;
                expect(name).toEqual(personUpdatedInfo.name);
                expect(films.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(homeworld.url).toBeDefined();
            })
    })

    it('Can delete one person', () => {
        const personId = 1;
        return request(app.getHttpServer())
            .delete(`/people/${personId}`)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body;
                expect(deletedAt).toBeTruthy();
            })
    })
});