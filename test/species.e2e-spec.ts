import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import mockUsers from '../src/mocks/user/mockUser';
import mockSpeciesDTO from '../src/mocks/species/mockSpeciesDTO';

describe('Species (e2e)', () => {
    const userRoleUser = {
        username: mockUsers.userRole.username,
        password: mockUsers.userRole.originPass,
    }
    const adminRoleUser = {
        username: mockUsers.adminRole.username,
        password: mockUsers.adminRole.originPass,
    }
    const getUserCookie = async (userCredentials: { username: string, password: string }) => {
        const loginRequest = await request(app.getHttpServer())
            .post('/users/signin')
            .send(userCredentials)
        return loginRequest.get('Set-Cookie');
    }
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Can create one species', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        return request(app.getHttpServer())
            .post(`/species`)
            .set('Cookie', loginCookie)
            .send(mockSpeciesDTO)
            .expect(201)
            .then(res => {
                const {id, name, films, people, homeworld, url} = res.body.data;
                expect(films.length).toBeGreaterThan(0);
                expect(people.length).toBeGreaterThan(0);
                expect(name).toBeDefined();
                expect(homeworld).toBeDefined();
                expect(url).toEqual(`localhost:3000/species/${id}`);
            })
    });

    it('Can find one species', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const speciesId = 1;

        return request(app.getHttpServer())
            .get(`/species/${speciesId}`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const {id, name, films, people, homeworld} = res.body.data;
                expect(id).toEqual(speciesId);
                expect(films.length).toBeGreaterThan(0);
                expect(people.length).toBeGreaterThan(0);
                expect(name).toBeDefined();
                expect(homeworld).toBeDefined();
            })
    });

    it('Throws Error. Find one species in DB', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const speciesId = 10000000;

        return request(app.getHttpServer())
            .get(`/species/${speciesId}`)
            .set('Cookie', loginCookie)
            .expect(404)
    });

    it('Can find many species', async () => {
        const loginCookie = await getUserCookie(userRoleUser);

        return request(app.getHttpServer())
            .get(`/species`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const speciesList = res.body.data;
                expect(speciesList.length).toBeTruthy();
                expect(speciesList[0]['people'].length).toBeGreaterThan(0);
                expect(speciesList[0]['films'].length).toBeGreaterThan(0);
                expect(speciesList[0]['homeworld']).toBeDefined();
            })
    });

    it('Can update the species', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const speciesId = 1;
        const speciesUpdatedInfo = {name: 'New Species Name'};

        return request(app.getHttpServer())
            .patch(`/species/${speciesId}`)
            .set('Cookie', loginCookie)
            .send(speciesUpdatedInfo)
            .expect(200)
            .then(res => {
                const {name, films, people, homeworld} = res.body.data;
                expect(name).toEqual(speciesUpdatedInfo.name);
                expect(films.length).toBeGreaterThan(0);
                expect(people.length).toBeGreaterThan(0);
                expect(homeworld).toBeDefined();
            })
    })

    it('Can delete one species', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const speciesId = 1;

        return request(app.getHttpServer())
            .delete(`/species/${speciesId}`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body.data;
                expect(deletedAt).toBeTruthy();
            })
    })
});