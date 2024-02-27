import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import mockUsers from '../src/mocks/user/mockUser';
import mockStarshipsDTO from '../src/mocks/starships/mockStarshipsDTO';

describe('Starships (e2e)', () => {
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


    it('Can create one starship', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);

        return request(app.getHttpServer())
            .post(`/starships`)
            .send(mockStarshipsDTO)
            .set('Cookie', loginCookie)
            .expect(201)
            .then(res => {
                const {id, pilots, films, url} = res.body.data;
                expect(pilots.length).toBeGreaterThan(0);
                expect(films.length).toBeGreaterThan(0);
                expect(id).toBeDefined();
                expect(url).toEqual(`localhost:3000/starships/${id}`);
            })
    });

    it('Can find one starship', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const starshipId = 10;

        return request(app.getHttpServer())
            .get(`/starships/${starshipId}`)
            .expect(200)
            .set('Cookie', loginCookie)
            .then(res => {
                const {id, pilots, films} = res.body.data;
                expect(id).toEqual(starshipId);
                expect(pilots.length).toBeGreaterThan(0);
                expect(films.length).toBeGreaterThan(0);
            })
    });

    it('Throws Error. Find one starship in DB', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const starshipId = 10000000;

        return request(app.getHttpServer())
            .get(`/starships/${starshipId}`)
            .set('Cookie', loginCookie)
            .expect(404)
    });

    it('Can find many starships', async () => {
        const loginCookie = await getUserCookie(userRoleUser);

        return request(app.getHttpServer())
            .get(`/starships`)
            .expect(200)
            .set('Cookie', loginCookie)
            .then(res => {
                const starshipsList = res.body.data;
                expect(starshipsList.length).toBeTruthy();
                expect(starshipsList[0]['pilots'].length).toBeGreaterThan(0);
                expect(starshipsList[0]['films'].length).toBeGreaterThan(0);
            })
    });

    it('Can update the starship', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const starshipId = 10;
        const starshipUpdatedInfo = {
            name: 'New starship Title',
            pilotsIds: [1, 2, 3],
            filmsIds: [1, 2, 3],
        };

        return request(app.getHttpServer())
            .patch(`/starships/${starshipId}`)
            .send(starshipUpdatedInfo)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const {name, pilots, films} = res.body.data;
                expect(name).toEqual(starshipUpdatedInfo.name);
                expect(pilots.length).toEqual(starshipUpdatedInfo.pilotsIds.length);
                expect(films.length).toEqual(starshipUpdatedInfo.filmsIds.length);
            })
    })

    it('Can delete one starship', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const starshipId = 2;

        return request(app.getHttpServer())
            .delete(`/starships/${starshipId}`)
            .expect(200)
            .set('Cookie', loginCookie)
            .then(res => {
                const {deletedAt} = res.body.data;
                expect(deletedAt).toBeTruthy();
            })
    })
});