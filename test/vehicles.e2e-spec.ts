import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import mockUsers from '../src/mocks/user/mockUser';
import mockVehiclesDTO from '../src/mocks/vehicles/mockVehiclesDTO';

describe('Vehicles (e2e)', () => {
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

    it('Can create one vehicle', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);

        return request(app.getHttpServer())
            .post(`/vehicles`)
            .set('Cookie', loginCookie)
            .send(mockVehiclesDTO)
            .expect(201)
            .then(res => {
                const {name, films, pilots} = res.body.data;
                expect(films.length).toBeGreaterThan(0);
                expect(pilots.length).toBeGreaterThan(0);
                expect(name).toBeDefined();
            })
    });

    it('Can find one vehicle', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const vehicleId = 14;

        return request(app.getHttpServer())
            .get(`/vehicles/${vehicleId}`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const {id, name, films, pilots} = res.body.data;
                expect(id).toEqual(vehicleId);
                expect(films.length).toBeGreaterThan(0);
                expect(pilots.length).toBeGreaterThan(0);
                expect(name).toBeDefined();
            })
    });

    it('Throws Error. Find one vehicle in DB', async () => {
        const loginCookie = await getUserCookie(userRoleUser);
        const vehicleId = 10000000;

        return request(app.getHttpServer())
            .get(`/vehicles/${vehicleId}`)
            .set('Cookie', loginCookie)
            .expect(404)
    });

    it('Can find many vehicles', async () => {
        const loginCookie = await getUserCookie(userRoleUser);

        return request(app.getHttpServer())
            .get(`/vehicles`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const vehiclesList = res.body.data;
                expect(vehiclesList.length).toBeTruthy();
                expect(vehiclesList[0]['pilots'].length).toBeGreaterThan(0);
                expect(vehiclesList[0]['films'].length).toBeGreaterThan(0);
            })
    });

    it('Can update the vehicle', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const vehicleId = 4;
        const vehicleUpdatedInfo = {
            name: 'New Test Name',
            filmsIds: [1, 2, 3],
            pilotsIds: [1, 2, 3],
        }

        return request(app.getHttpServer())
            .patch(`/vehicles/${vehicleId}`)
            .set('Cookie', loginCookie)
            .send(vehicleUpdatedInfo)
            .expect(200)
            .then(res => {
                const {name, films, pilots} = res.body.data;
                expect(name).toEqual(vehicleUpdatedInfo.name);
                expect(films.length).toEqual(vehicleUpdatedInfo.filmsIds.length);
                expect(pilots.length).toEqual(vehicleUpdatedInfo.pilotsIds.length);
            })
    })

    it('Can delete one vehicle', async () => {
        const loginCookie = await getUserCookie(adminRoleUser);
        const vehicleId = 4;

        return request(app.getHttpServer())
            .delete(`/vehicles/${vehicleId}`)
            .set('Cookie', loginCookie)
            .expect(200)
            .then(res => {
                const {deletedAt} = res.body.data;
                expect(deletedAt).toBeTruthy();
            })
    })
});