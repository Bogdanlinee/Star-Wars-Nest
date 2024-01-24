import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {PlanetsController} from './planets.controller';
import {Planet} from './entities/planet.entity';
import {PlanetsService} from './planets.service';

describe('PeopleController', () => {
    let controller: PlanetsController;
    let planetRepository: Repository<Planet>;
    const planets: Planet[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlanetsController],
            providers: [
                {
                    provide: PlanetsService,
                    useClass: PlanetsService
                },
                {
                    provide: getRepositoryToken(Planet),
                    useValue: () => {
                    },
                },
            ],
        }).compile();

        controller = module.get<PlanetsController>(PlanetsController);
        planetRepository = module.get<Repository<Planet>>(getRepositoryToken(Planet));
    });

    it('Can add one planet in DB.', async () => {
        jest.spyOn(controller['planetsService'], 'create').mockResolvedValue(testPlanetEntity);
        const result = await controller.create(testPlanetEntity);
        planets.push(testPlanetEntity);
        expect(result).toEqual(testPlanetEntity);
    });

    it('Can find one planet in DB.', async () => {
        const planetId = 1;
        jest.spyOn(controller['planetsService'], 'findOne').mockImplementation(async () => {
            const planet = planets.find(item => item.id === planetId)
            return planet ? planet : null;
        });
        const result = await controller.findOne(planetId);
        expect(result).toEqual(testPlanetEntity);
    });

    it('Throws Error. Find planet in DB.', async () => {
        const planetId = 0;
        jest.spyOn(controller['planetsService'], 'findOne').mockImplementation(async () => {
            const planet = planets.find(item => item.id === planetId)
            return planet ? planet : null;
        });
        await expect(controller.findOne(planetId)).rejects.toThrow(NotFoundException);
    });

    const testPlanetEntity = {
        id: 1,
        name: "Corellia",
        rotation_period: "25",
        orbital_period: "329",
        diameter: "11000",
        climate: "temperate",
        gravity: "1 standard",
        terrain: "plains, urban, hills, forests",
        surface_water: "70",
        population: "3000000000",
        url: "https://swapi.dev/api/planets/22/",
        residentIds: [],
        speciesIds: [],
        filmIds: [],
        planets: [],
        species: [],
        residents: [],
        films: [],
        created: new Date(),
        edited: new Date(),
        deletedAt: new Date(),
    };
});
