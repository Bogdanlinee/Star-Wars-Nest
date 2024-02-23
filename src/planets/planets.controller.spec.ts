import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {PlanetsController} from './planets.controller';
import {Planet} from './entities/planet.entity';
import {PlanetsService} from './planets.service';
import {Person} from '../people/entities/person.entity';
import {Film} from '../films/entities/film.entity';
import {Species} from '../species/entities/species.entity';
import mockPlanetsEntity from '../mocks/planetes/mockPlanetsEntity';

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
                {
                    provide: getRepositoryToken(Species),
                    useValue: () => {
                    },
                },
            ],
        }).compile();

        controller = module.get<PlanetsController>(PlanetsController);
        planetRepository = module.get<Repository<Planet>>(getRepositoryToken(Planet));
    });

    it('Can add one planet in DB.', async () => {
        jest.spyOn(controller['planetsService'], 'create').mockResolvedValue(mockPlanetsEntity);
        const result = await controller.create(mockPlanetsEntity);
        planets.push(mockPlanetsEntity);
        expect(result).toEqual(mockPlanetsEntity);
    });

    it('Can find one planet in DB.', async () => {
        const planetId = 1;
        jest.spyOn(controller['planetsService'], 'findOne').mockImplementation(async () => {
            const planet = planets.find(item => item.id === planetId)
            return planet ? planet : null;
        });
        const result = await controller.findOne(planetId);
        expect(result).toEqual(mockPlanetsEntity);
    });

    it('Throws Error. Find planet in DB.', async () => {
        const planetId = 0;
        jest.spyOn(controller['planetsService'], 'findOne').mockImplementation(async () => {
            const planet = planets.find(item => item.id === planetId)
            return planet ? planet : null;
        });
        await expect(controller.findOne(planetId)).rejects.toThrow(NotFoundException);
    });
});
