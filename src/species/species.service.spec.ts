import {Repository} from 'typeorm';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {SpeciesService} from './species.service';
import {Species} from './entities/species.entity';

describe('UserService', () => {
    let speciesService: SpeciesService;
    let speciesRepository: Repository<Species>;
    const species: Species[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SpeciesService,
                {
                    provide: getRepositoryToken(Species),
                    useClass: Repository,
                }
            ],
        }).compile();

        speciesService = module.get<SpeciesService>(SpeciesService);
        speciesRepository = module.get<Repository<Species>>(getRepositoryToken(Species));
    });

    it('Can add a new species to DB', async () => {
        jest.spyOn(speciesRepository, 'save').mockResolvedValue(testSpeciesEntity);
        jest.spyOn(speciesRepository, 'create').mockReturnValue(testSpeciesEntity);

        const result = await speciesService.create(testSpeciesEntity);

        species.push(result);

        expect(result).toEqual(testSpeciesEntity);
    });


    it('Can find one species in DB', async () => {
        const speciesId = 1;

        jest.spyOn(speciesRepository, 'findOne').mockImplementation(async () => {
            const oneSpecies = species.find(item => item.id === speciesId)
            return oneSpecies ? oneSpecies : null;
        });

        const result = await speciesService.findOne(speciesId);

        expect(result).toEqual(species[0]);
    });

    it('Throws Error. Find species in DB to remove it', async () => {
        const speciesId = 10;

        jest.spyOn(speciesRepository, 'findOne').mockImplementation(async () => {
            const oneSpecies = species.find(item => item.id === speciesId)
            return oneSpecies ? oneSpecies : null;
        });
        jest.spyOn(speciesRepository, 'save').mockResolvedValue(testSpeciesEntity);

        await expect(speciesService.remove(speciesId)).rejects.toThrow(NotFoundException);
    });

    it('Can find species in DB to remove it', async () => {
        const speciesId = 1;
        const speciesToDelete = {
            ...testSpeciesEntity,
            deletedAt: new Date(),
        };

        jest.spyOn(speciesRepository, 'save').mockResolvedValue(speciesToDelete);
        jest.spyOn(speciesRepository, 'create').mockReturnValue(speciesToDelete);
        jest.spyOn(speciesRepository, 'findOne').mockImplementation(async () => {
            const oneSpecies = species.find(item => item.id === speciesId);
            return oneSpecies ? oneSpecies : null;
        });

        const result = await speciesService.remove(speciesId);

        expect(result).toBeDefined();
    });

    const testSpeciesEntity = {
        id: 1,
        name: 'Pau\'an',
        classification: 'mammal',
        designation: 'sentient',
        average_height: '190',
        skin_colors: 'grey',
        hair_colors: 'none',
        eye_colors: 'black',
        average_lifespan: '700',
        homeworld: 'https://swapi.dev/api/planets/12/',
        language: 'Utapese',
        people: [],
        films: [],
        url: 'https://swapi.dev/api/species/37/',
        created: new Date(),
        edited: new Date(),
        deletedAt: new Date(),
        filmIds: [],
        peopleIds: [],
    };
});