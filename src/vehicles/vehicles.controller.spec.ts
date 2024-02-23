import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {VehiclesController} from './vehicles.controller';
import {VehiclesService} from './vehicles.service';
import {Vehicle} from './entities/vehicle.entity';
import {Person} from '../people/entities/person.entity';
import {Film} from '../films/entities/film.entity';
import mockVehiclesEntity from '../mocks/vehicles/mockVehiclesEntity';

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
                {
                    provide: getRepositoryToken(Person),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Film),
                    useValue: () => {
                    },
                },
            ],
        }).compile();

        controller = module.get<VehiclesController>(VehiclesController);
        vehicleRepository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
    });

    it('Can add one vehicle in DB.', async () => {
        jest.spyOn(controller['vehiclesService'], 'create').mockResolvedValue(mockVehiclesEntity);
        const result = await controller.create(mockVehiclesEntity);
        vehicles.push(mockVehiclesEntity);
        expect(result).toEqual(mockVehiclesEntity);
    });

    it('Can find one vehicle in DB.', async () => {
        const vehicleId = 1;
        jest.spyOn(controller['vehiclesService'], 'findOne').mockImplementation(async () => {
            const vehicle = vehicles.find(item => item.id === vehicleId)
            return vehicle ? vehicle : null;
        });
        const result = await controller.findOne(vehicleId);
        expect(result).toEqual(mockVehiclesEntity);
    });

    it('Throws Error. Find vehicle in DB.', async () => {
        const vehicleId = 0;
        jest.spyOn(controller['vehiclesService'], 'findOne').mockImplementation(async () => {
            const vehicle = vehicles.find(item => item.id === vehicleId)
            return vehicle ? vehicle : null;
        });
        await expect(controller.findOne(vehicleId)).rejects.toThrow(NotFoundException);
    });
});
