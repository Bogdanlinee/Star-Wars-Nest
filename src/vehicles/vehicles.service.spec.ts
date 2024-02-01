import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {VehiclesService} from './vehicles.service';
import {Vehicle} from './entities/vehicle.entity';
import {Person} from '../people/entities/person.entity';
import {Film} from '../films/entities/film.entity';

describe('VehiclesService', () => {
    let vehiclesService: VehiclesService;
    let vehiclesRepository: Repository<Vehicle>;
    const vehicles: Vehicle[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehiclesService,
                {
                    provide: getRepositoryToken(Vehicle),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Person),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Film),
                    useClass: Repository,
                },
            ],
        }).compile();

        vehiclesService = module.get<VehiclesService>(VehiclesService);
        vehiclesRepository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
    });

    it('Can add a new vehicle to DB', async () => {
        jest.spyOn(vehiclesRepository, 'save').mockResolvedValue(testVehicleEntity);
        jest.spyOn(vehiclesRepository, 'create').mockReturnValue(testVehicleEntity);

        const result = await vehiclesService.create(testVehicleEntity);

        vehicles.push(result);

        expect(result).toEqual(testVehicleEntity);
    });

    it('Can find a vehicle in DB', async () => {
        const vehicleId = 1;

        jest.spyOn(vehiclesRepository, 'findOne').mockImplementation(async () => {
            const vehicle = vehicles.find(item => item.id === vehicleId)
            return vehicle ? vehicle : null;
        });

        const result = await vehiclesService.findOne(vehicleId);

        expect(result).toEqual(vehicles[0]);
    });

    it('Throws Error. Find vehicle in DB to remove it', async () => {
        const vehicleId = 10;

        jest.spyOn(vehiclesRepository, 'findOne').mockImplementation(async () => {
            const vehicle = vehicles.find(item => item.id === vehicleId)
            return vehicle ? vehicle : null;
        });
        jest.spyOn(vehiclesRepository, 'save').mockResolvedValue(testVehicleEntity);

        await expect(vehiclesService.remove(vehicleId)).rejects.toThrow(NotFoundException);
    });

    it('Can find vehicle in DB to remove it', async () => {
        const vehicleId = 1;
        const vehicleToDelete = {
            ...testVehicleEntity,
            deletedAt: new Date(),
        };

        jest.spyOn(vehiclesRepository, 'save').mockResolvedValue(vehicleToDelete);
        jest.spyOn(vehiclesRepository, 'create').mockReturnValue(vehicleToDelete);
        jest.spyOn(vehiclesRepository, 'findOne').mockImplementation(async () => {
            const vehicle = vehicles.find(item => item.id === vehicleId)
            return vehicle ? vehicle : null;
        });

        const result = await vehiclesService.remove(vehicleId);

        expect(result).toBeDefined();
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