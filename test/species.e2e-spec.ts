import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';

describe('Species (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Can find one species', () => {
        const speciesId = 1;
        return request(app.getHttpServer())
            .get(`/species/${speciesId}`)
            .expect(200)
            .then(res => {
                const {id, name, films, people} = res.body;
                expect(id).toEqual(speciesId);
                expect(films.length).toBeGreaterThan(0);
                expect(people.length).toBeGreaterThan(0);
                expect(name).toBeDefined();
            })
    });

    it('Throws Error. Find one species in DB', () => {
        const speciesId = 10000000;
        return request(app.getHttpServer())
            .get(`/species/${speciesId}`)
            .expect(404)
    });

    it('Can find many species', () => {
        return request(app.getHttpServer())
            .get(`/species`)
            .expect(200)
            .then(res => {
                const speciesList = res.body;
                expect(speciesList.length).toBeTruthy();
                expect(speciesList[0]['people'].length).toBeGreaterThan(0);
                expect(speciesList[0]['films'].length).toBeGreaterThan(0);
            })
    });

    it('Can update the species', () => {
        const speciesId = 1;
        const speciesUpdatedInfo = {name: 'New Species Name'};
        return request(app.getHttpServer())
            .patch(`/species/${speciesId}`)
            .send(speciesUpdatedInfo)
            .expect(200)
            .then(res => {
                const {name, films, people} = res.body;
                expect(name).toEqual(speciesUpdatedInfo.name);
                expect(films.length).toBeGreaterThan(0);
                expect(people.length).toBeGreaterThan(0);
            })
    })

    it('Can delete one species', () => {
        const speciesId = 1;
        return request(app.getHttpServer())
            .delete(`/species/${speciesId}`)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body;
                expect(deletedAt).toBeTruthy();
            })
    })
});