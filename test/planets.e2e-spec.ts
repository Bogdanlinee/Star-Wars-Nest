import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import mockPlanetsDTO from '../src/mocks/planets/mockPlanetsDTO';
import mockUsers from '../src/mocks/user/mockUser';

describe('Planets (e2e)', () => {
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

    it('Can create one planet', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);

        return request(app.getHttpServer())
            .post(`/planets`)
            .set('Cookie', loginCookie)
            .send(mockPlanetsDTO)
            .expect(201)
            .then(res => {
                const {id, residents, species, films, url} = res.body.data;
                expect(residents.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(films.length).toBeGreaterThan(0);
                expect(id).toBeDefined();
                expect(url).toEqual(`localhost:3000/planets/${id}`);
            })
    });

    it('Can find one planet', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const planetId = 7;

        return request(app.getHttpServer())
            .get(`/planets/${planetId}`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const {id, residents, species, films} = res.body.data;
                expect(id).toEqual(planetId);
                expect(residents.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(films.length).toBeGreaterThan(0);
            })
    });

    it('Throws Error. Find one planet in DB', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const planetId = 10000000;

        return request(app.getHttpServer())
            .get(`/planets/${planetId}`)
            .set('Cookie', loginCookie)
            .expect(404)
    });

    it('Can find many planets', async () => {
        const loginCookie = await getUserCookie(userRoleUser);

        return request(app.getHttpServer())
            .get(`/planets`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const planetsList = res.body.data;
                expect(planetsList.length).toBeTruthy();
                expect(planetsList[0]['residents'].length).toBeGreaterThan(0);
                expect(planetsList[0]['species'].length).toBeGreaterThan(0);
                expect(planetsList[0]['films'].length).toBeGreaterThan(0);
            })
    });

    it('Can update the planet', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const planetId = 7;
        const planetUpdatedInfo = {
            name: 'New planet Title',
            residentIds: [1, 2, 3],
            speciesIds: [1, 2, 3],
            filmIds: [1, 2, 3],
        };

        return request(app.getHttpServer())
            .patch(`/planets/${planetId}`)
            .set('Cookie', loginCookie)
            .send(planetUpdatedInfo)
            .expect(200)
            .then(res => {
                const {name, residents, species, films} = res.body.data;
                expect(name).toEqual(planetUpdatedInfo.name);
                expect(residents.length).toEqual(planetUpdatedInfo.residentIds.length);
                expect(species.length).toEqual(planetUpdatedInfo.speciesIds.length);
                expect(films.length).toEqual(planetUpdatedInfo.filmIds.length);
            })
    })

    it('Can delete one planet', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const planetId = 1;

        return request(app.getHttpServer())
            .delete(`/planets/${planetId}`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body.data;
                expect(deletedAt).toBeTruthy();
            })
    })
});