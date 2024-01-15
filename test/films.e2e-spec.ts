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
        const personId = 1;
        return request(app.getHttpServer())
            .get(`/films/${personId}`)
            .expect(200)
            .then(res => {
                const {id, title} = res.body;
                expect(id).toEqual(personId);
                expect(title).toBeDefined();
            })
    });

    // it('Throws Error. Find one person in DB', () => {
    //     const personId = 10000000;
    //     return request(app.getHttpServer())
    //         .get(`/people/${personId}`)
    //         .expect(404)
    // });
    //
    // it('Can find many people', () => {
    //     return request(app.getHttpServer())
    //         .get(`/people`)
    //         .expect(200)
    //         .then(res => {
    //             const amountOfPeople = res.body.length;
    //             expect(amountOfPeople).toBeTruthy();
    //         })
    // });
    //
    // it('Can update the person', () => {
    //     const personUpdatedInfo = {name: 'New Test Name'};
    //     return request(app.getHttpServer())
    //         .patch('/people/1')
    //         .send(personUpdatedInfo)
    //         .expect(200)
    //         .then(res => {
    //             const {name} = res.body;
    //             expect(name).toEqual(personUpdatedInfo.name);
    //         })
    // })
    //
    // it('Can delete one person', () => {
    //     const personId = 1;
    //     return request(app.getHttpServer())
    //         .delete(`/people/${personId}`)
    //         .expect(200)
    //         .then(res => {
    //             const {deletedAt} = res.body;
    //             expect(deletedAt).toBeTruthy();
    //         })
    // })
});