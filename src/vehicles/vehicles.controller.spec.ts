import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {VehiclesController} from './vehicles.controller';
import {VehiclesService} from './vehicles.service';
import {Vehicle} from './entities/vehicle.entity';

describe('VehiclesController', () => {
    let controller: VehiclesController;
    let vehiclesService: VehiclesService;
    let vehicleRepository: Repository<Vehicle>;
    const vehicles: Vehicle[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehiclesController],
            providers: [
                {
                    provide: VehiclesService,
                    useClass: VehiclesService
                },
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: () => {
                    },
                },
            ],
        }).compile();

        controller = module.get<VehiclesController>(VehiclesController);
        vehicleRepository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
    });

    it('Can add one vehicle in DB.', async () => {
        jest.spyOn(controller['vehiclesService'], 'create').mockResolvedValue(testVehicleEntity);
        const result = await controller.create(testVehicleEntity);
        vehicles.push(testVehicleEntity);
        expect(result).toEqual(testVehicleEntity);
    });

    it('Can find one vehicle in DB.', async () => {
        const vehicleId = 1;
        jest.spyOn(controller['vehiclesService'], 'findOne').mockImplementation(async () => {
            const vehicle = vehicles.find(item => item.id === vehicleId)
            return vehicle ? vehicle : null;
        });
        const result = await controller.findOne(vehicleId);
        expect(result).toEqual(testVehicleEntity);
    });

    it('Throws Error. Find vehicle in DB.', async () => {
        const vehicleId = 0;
        jest.spyOn(controller['vehiclesService'], 'findOne').mockImplementation(async () => {
            const vehicle = vehicles.find(item => item.id === vehicleId)
            return vehicle ? vehicle : null;
        });
        await expect(controller.findOne(vehicleId)).rejects.toThrow(NotFoundException);
    });

    const testVehicleEntity = {
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
        pilots: [],
        films: [],
        pilotsIds: [],
        filmsIds: [],
        url: "https://swapi.dev/api/vehicles/4/",
        created: new Date(),
        edited: new Date(),
        deletedAt: new Date(),
        id: 1,
    };
});
