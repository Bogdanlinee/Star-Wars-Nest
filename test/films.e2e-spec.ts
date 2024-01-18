import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';

describe('Films (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Can find one film', () => {
        const filmId = 1;
        return request(app.getHttpServer())
            .get(`/films/${filmId}`)
            .expect(200)
            .then(res => {
                const {id, title, species, characters} = res.body;
                expect(id).toEqual(filmId);
                expect(species.length).toBeGreaterThan(0);
                expect(characters.length).toBeGreaterThan(0);
                expect(title).toBeDefined();
            })
    });

    it('Throws Error. Find one film in DB', () => {
        const filmId = 10000000;
        return request(app.getHttpServer())
            .get(`/films/${filmId}`)
            .expect(404)
    });

    it('Can find many films', () => {
        return request(app.getHttpServer())
            .get(`/films`)
            .expect(200)
            .then(res => {
                const filmsList = res.body;
                expect(filmsList.length).toBeTruthy();
                expect(filmsList[0]['characters'].length).toBeGreaterThan(0);
                expect(filmsList[0]['species'].length).toBeGreaterThan(0);
            })
    });

    it('Can update the film', () => {
        const filmId = 1;
        const filmUpdatedInfo = {title: 'New Film Title'};
        return request(app.getHttpServer())
            .patch(`/films/${filmId}`)
            .send(filmUpdatedInfo)
            .expect(200)
            .then(res => {
                const {title, species, characters} = res.body;
                expect(title).toEqual(filmUpdatedInfo.title);
                expect(species.length).toBeGreaterThan(0);
                expect(characters.length).toBeGreaterThan(0);
            })
    })

    it('Can delete one film', () => {
        const filmId = 1;
        return request(app.getHttpServer())
            .delete(`/films/${filmId}`)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body;
                expect(deletedAt).toBeTruthy();
            })
    })
});