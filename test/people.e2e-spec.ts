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
    },);

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
                starshipIds: [2],
                vehicleIds: [4, 6, 7],
                homeworldId: 1
            })
            .expect(201)
            .then(res => {
                const {name, films, species, homeworld, starships, vehicles} = res.body.data;
                expect(films.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(starships.length).toBeGreaterThan(0);
                expect(vehicles.length).toBeGreaterThan(0);
                expect(homeworld).toBeDefined();
                expect(name).toBeDefined();
            })
    });

    it('Can find one person', () => {
        const personId = 13;
        return request(app.getHttpServer())
            .get(`/people/${personId}`)
            .expect(200)
            .then(res => {
                const {id, name, films, species, homeworld, starships, vehicles} = res.body.data;
                expect(id).toEqual(personId);
                expect(films.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(starships.length).toBeGreaterThan(0);
                expect(vehicles.length).toBeGreaterThan(0);
                expect(name).toBeDefined();
                expect(homeworld).toBeDefined();
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
                const peopleList = res.body.data;
                expect(peopleList.length).toBeTruthy();
                expect(peopleList[0]['films'].length).toBeGreaterThan(0);
                expect(peopleList[0]['species'].length).toBeGreaterThan(0);
                expect(peopleList[0]['starships'].length).toBeGreaterThan(0);
                expect(peopleList[0]['vehicles'].length).toBeGreaterThan(0);
                expect(peopleList[0]['homeworld']).toBeDefined();
            })
    });

    it('Can update the person', () => {
        const personId = 13;
        const personUpdatedInfo = {
            name: 'New Test Name',
            filmIds: [1, 2, 3],
            speciesIds: [1, 2, 3],
            starshipIds: [2, 3, 5],
            vehicleIds: [4, 6, 7],
            homeworldId: 2
        }
        return request(app.getHttpServer())
            .patch(`/people/${personId}`)
            .send(personUpdatedInfo)
            .expect(200)
            .then(res => {
                const {name, films, species, homeworld, starships, vehicles} = res.body.data;
                expect(name).toEqual(personUpdatedInfo.name);
                expect(films.length).toEqual(personUpdatedInfo.filmIds.length);
                expect(species.length).toEqual(personUpdatedInfo.speciesIds.length);
                expect(starships.length).toEqual(personUpdatedInfo.starshipIds.length);
                expect(vehicles.length).toEqual(personUpdatedInfo.vehicleIds.length);
                expect(homeworld).toBeDefined();
            })
    })

    it('Can delete one person', () => {
        const personId = 1;
        return request(app.getHttpServer())
            .delete(`/people/${personId}`)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body.data;
                expect(deletedAt).toBeTruthy();
            })
    })
});