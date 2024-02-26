import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {Planet} from './entities/planet.entity';
import {PlanetsService} from './planets.service';
import {Person} from '../people/entities/person.entity';
import {Film} from '../films/entities/film.entity';
import {Species} from '../species/entities/species.entity';
import mockPlanetsEntity from '../mocks/planets/mockPlanetsEntity';

describe('planetsService', () => {
    let planetsService: PlanetsService;
    let planetsRepository: Repository<Planet>;
    const planets: Planet[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlanetsService,
                {
                    provide: getRepositoryToken(Planet),
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
                {
                    provide: getRepositoryToken(Species),
                    useClass: Repository,
                },
            ],
        }).compile();

        planetsService = module.get<PlanetsService>(PlanetsService);
        planetsRepository = module.get<Repository<Planet>>(getRepositoryToken(Planet));
    });

    it('Can add a new planet to DB', async () => {
        jest.spyOn(planetsRepository, 'save').mockResolvedValue(mockPlanetsEntity);
        jest.spyOn(planetsRepository, 'create').mockReturnValue(mockPlanetsEntity);

        const result = await planetsService.create(mockPlanetsEntity);

        planets.push(result);

        expect(result).toEqual(mockPlanetsEntity);
    });

    it('Can find a planet in DB', async () => {
        const planetId = 1;

        jest.spyOn(planetsRepository, 'findOne').mockImplementation(async () => {
            const planet = planets.find(item => item.id === planetId)
            return planet ? planet : null;
        });

        const result = await planetsService.findOne(planetId);

        expect(result).toEqual(planets[0]);
    });

    it('Throws Error. Find planet in DB to remove it', async () => {
        const planetId = 10;

        jest.spyOn(planetsRepository, 'findOne').mockImplementation(async () => {
            const planet = planets.find(item => item.id === planetId)
            return planet ? planet : null;
        });
        jest.spyOn(planetsRepository, 'save').mockResolvedValue(mockPlanetsEntity);

        await expect(planetsService.remove(planetId)).rejects.toThrow(NotFoundException);
    });

    it('Can find planet in DB to remove it', async () => {
        const planetId = 1;
        const planetToDelete = {
            ...mockPlanetsEntity,
            deletedAt: new Date(),
        };

        jest.spyOn(planetsRepository, 'save').mockResolvedValue(planetToDelete);
        jest.spyOn(planetsRepository, 'create').mockReturnValue(planetToDelete);
        jest.spyOn(planetsRepository, 'findOne').mockImplementation(async () => {
            const planet = planets.find(item => item.id === planetId)
            return planet ? planet : null;
        });

        const result = await planetsService.remove(planetId);

        expect(result).toBeDefined();
    });
});