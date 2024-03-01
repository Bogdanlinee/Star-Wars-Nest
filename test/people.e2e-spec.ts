import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import mockPeopleDTO from '../src/mocks/people/mockPeopleDTO';
import mockUsers from '../src/mocks/user/mockUser';

describe('People (e2e)', () => {
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
    },);

    it('Can create one person', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);

        return request(app.getHttpServer())
            .post(`/people`)
            .set('Cookie', loginCookie)
            .send(mockPeopleDTO)
            .expect(201)
            .then(res => {
                const {name, films, species, homeworld, starships, vehicles, url, id} = res.body.data;
                expect(films.length).toBeGreaterThan(0);
                expect(species.length).toBeGreaterThan(0);
                expect(starships.length).toBeGreaterThan(0);
                expect(vehicles.length).toBeGreaterThan(0);
                expect(homeworld).toBeDefined();
                expect(name).toBeDefined();
                expect(url).toEqual(`localhost:3000/people/${id}`);
            })
    });

    it('Can find one person', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const personId = 13;

        return request(app.getHttpServer())
            .get(`/people/${personId}`)
            .set('Cookie', loginCookie)
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

    it('Throws Error. Find one person in DB', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const personId = 10000000;

        return request(app.getHttpServer())
            .get(`/people/${personId}`)
            .set('Cookie', loginCookie)
            .expect(404)
    });

    it('Can find many people', async () => {
        const loginCookie = await getUserCookie(userRoleUser);

        return request(app.getHttpServer())
            .get(`/people`)
            .set('Cookie', loginCookie)
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

    it('Can update the person', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
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
            .set('Cookie', loginCookie)
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

    it('Can delete one person', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const personId = 1;

        return request(app.getHttpServer())
            .delete(`/people/${personId}`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body.data;
                expect(deletedAt).toBeTruthy();
            })
    })
});