import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import mockUsers from '../src/mocks/user/mockUser';
import mockFilmsDTO from '../src/mocks/films/mockFilmsDTO';

describe('Films (e2e)', () => {
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

    it('Can create one film', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);

        return request(app.getHttpServer())
            .post(`/films`)
            .send(mockFilmsDTO)
            .set('Cookie', loginCookie)
            .expect(201)
            .then(res => {
                const {characters, species, planets, starships, vehicles} = res.body.data;
                expect(characters.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(planets.length).toBeGreaterThan(0);
                expect(starships.length).toBeGreaterThan(0);
                expect(vehicles.length).toBeGreaterThan(0);
            })
    });

    it('Can find one film', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const filmId = 1;

        return request(app.getHttpServer())
            .get(`/films/${filmId}`)
            .expect(200)
            .set('Cookie', loginCookie)
            .then(res => {
                const {id, title, species, characters, planets, starships, vehicles} = res.body.data;
                expect(id).toEqual(filmId);
                expect(species.length).toBeGreaterThan(0);
                expect(characters.length).toBeGreaterThan(0);
                expect(planets.length).toBeGreaterThan(0);
                expect(starships.length).toBeGreaterThan(0);
                expect(vehicles.length).toBeGreaterThan(0);
                expect(title).toBeDefined();
            })
    });

    it('Throws Error. Find one film in DB', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const filmId = 10000000;

        return request(app.getHttpServer())
            .get(`/films/${filmId}`)
            .set('Cookie', loginCookie)
            .expect(404)
    });

    it('Can find many films', async () => {
        const loginCookie = await getUserCookie(userRoleUser);

        return request(app.getHttpServer())
            .get(`/films`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const filmsList = res.body.data;
                expect(filmsList.length).toBeTruthy();
                expect(filmsList[0]['characters'].length).toBeGreaterThan(0);
                expect(filmsList[0]['species'].length).toBeGreaterThan(0);
                expect(filmsList[0]['planets'].length).toBeGreaterThan(0);
                expect(filmsList[0]['starships'].length).toBeGreaterThan(0);
                expect(filmsList[0]['vehicles'].length).toBeGreaterThan(0);
            })
    });

    it('Can update the film', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const filmId = 1;
        const filmUpdatedInfo = {
            title: 'New Film Title',
            speciesIds: [1, 2, 3],
            personIds: [1, 2, 3],
            planetIds: [1, 2, 3],
            starshipIds: [2, 3, 5],
            vehicleIds: [4, 6, 7],
        };

        return request(app.getHttpServer())
            .patch(`/films/${filmId}`)
            .send(filmUpdatedInfo)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const {title, species, characters, planets, starships, vehicles} = res.body.data;
                expect(title).toEqual(filmUpdatedInfo.title);
                expect(species.length).toEqual(filmUpdatedInfo.speciesIds.length);
                expect(characters.length).toEqual(filmUpdatedInfo.personIds.length);
                expect(planets.length).toEqual(filmUpdatedInfo.planetIds.length);
                expect(starships.length).toEqual(filmUpdatedInfo.starshipIds.length);
                expect(vehicles.length).toEqual(filmUpdatedInfo.vehicleIds.length);
            })
    });

    it('Can delete one film', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const filmId = 1;

        return request(app.getHttpServer())
            .delete(`/films/${filmId}`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body.data;
                expect(deletedAt).toBeTruthy();
            })
    });
});