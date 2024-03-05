import {Repository} from 'typeorm';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {SpeciesService} from './species.service';
import {Species} from './entities/species.entity';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';
import {Planet} from '../planets/entities/planet.entity';
import mockSpeciesEntity from '../mocks/species/mockSpeciesEntity';

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
                },
                {
                    provide: getRepositoryToken(Film),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Person),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Planet),
                    useValue: {
                        findOne: () => {
                            return;
                        }
                    }
                },
            ],
        }).compile();

        speciesService = module.get<SpeciesService>(SpeciesService);
        speciesRepository = module.get<Repository<Species>>(getRepositoryToken(Species));
    });

    it('Can add a new species to DB', async () => {
        jest.spyOn(speciesRepository, 'save').mockResolvedValue(mockSpeciesEntity);
        jest.spyOn(speciesRepository, 'create').mockReturnValue(mockSpeciesEntity);

        const result = await speciesService.create(mockSpeciesEntity);

        species.push(result);

        expect(result).toEqual(mockSpeciesEntity);
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
        jest.spyOn(speciesRepository, 'save').mockResolvedValue(mockSpeciesEntity);

        await expect(speciesService.remove(speciesId)).rejects.toThrow(NotFoundException);
    });

    it('Can find species in DB to remove it', async () => {
        const speciesId = 1;
        const speciesToDelete = {
            ...mockSpeciesEntity,
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
});