import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {Planet} from './entities/planet.entity';
import {PlanetsService} from './planets.service';
import {Person} from '../people/entities/person.entity';
import {Film} from '../films/entities/film.entity';
import {Species} from '../species/entities/species.entity';

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
        jest.spyOn(planetsRepository, 'save').mockResolvedValue(testPlanetEntity);
        jest.spyOn(planetsRepository, 'create').mockReturnValue(testPlanetEntity);

        const result = await planetsService.create(testPlanetEntity);

        planets.push(result);

        expect(result).toEqual(testPlanetEntity);
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
        jest.spyOn(planetsRepository, 'save').mockResolvedValue(testPlanetEntity);

        await expect(planetsService.remove(planetId)).rejects.toThrow(NotFoundException);
    });

    it('Can find planet in DB to remove it', async () => {
        const planetId = 1;
        const planetToDelete = {
            ...testPlanetEntity,
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