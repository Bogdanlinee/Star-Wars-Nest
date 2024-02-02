import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';

describe('Vehicles (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    },);

    it('Can create one vehicle', () => {
        return request(app.getHttpServer())
            .post(`/vehicles`)
            .send({
                name: "Sand Crawler",
                model: "Digger Crawler",
                manufacturer: "Corellia Mining Corporation",
                cost_in_credits: "150000",
                length: "36.8 ",
                max_atmosphering_speed: "30",
                crew: "46",
                passengers: "30",
                cargo_capacity: "50000",
                consumables: "2 months",
                vehicle_class: "wheeled",
                pilotsIds: [1],
                filmsIds: [1],
                url: "https://swapi.dev/api/vehicles/4/"
            })
            .expect(201)
            .then(res => {
                const {name, films, pilots} =  res.body.data;
                expect(films.length).toBeGreaterThan(0);
                expect(pilots.length).toBeGreaterThan(0);
                expect(name).toBeDefined();
            })
    });

    it('Can find one vehicle', () => {
        const vehicleId = 14;
        return request(app.getHttpServer())
            .get(`/vehicles/${vehicleId}`)
            .expect(200)
            .then(res => {
                const {id, name, films, pilots} =  res.body.data;
                expect(id).toEqual(vehicleId);
                expect(films.length).toBeGreaterThan(0);
                expect(pilots.length).toBeGreaterThan(0);
                expect(name).toBeDefined();
            })
    });

    it('Throws Error. Find one vehicle in DB', () => {
        const vehicleId = 10000000;
        return request(app.getHttpServer())
            .get(`/vehicles/${vehicleId}`)
            .expect(404)
    });

    it('Can find many vehicles', () => {
        return request(app.getHttpServer())
            .get(`/vehicles`)
            .expect(200)
            .then(res => {
                const vehiclesList =  res.body.data;
                expect(vehiclesList.length).toBeTruthy();
                expect(vehiclesList[0]['pilots'].length).toBeGreaterThan(0);
                expect(vehiclesList[0]['films'].length).toBeGreaterThan(0);
            })
    });

    it('Can update the vehicle', () => {
        const vehicleId = 4;
        const vehicleUpdatedInfo = {
            name: 'New Test Name',
            filmsIds: [1, 2, 3],
            pilotsIds: [1, 2, 3],
        }
        return request(app.getHttpServer())
            .patch(`/vehicles/${vehicleId}`)
            .send(vehicleUpdatedInfo)
            .expect(200)
            .then(res => {
                const {name, films, pilots} =  res.body.data;
                expect(name).toEqual(vehicleUpdatedInfo.name);
                expect(films.length).toEqual(vehicleUpdatedInfo.filmsIds.length);
                expect(pilots.length).toEqual(vehicleUpdatedInfo.pilotsIds.length);
            })
    })

    it('Can delete one vehicle', () => {
        const vehicleId = 4;
        return request(app.getHttpServer())
            .delete(`/vehicles/${vehicleId}`)
            .expect(200)
            .then(res => {
                const {deletedAt} =  res.body.data;
                expect(deletedAt).toBeTruthy();
            })
    })
});