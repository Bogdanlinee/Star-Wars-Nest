import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {SpeciesController} from './species.controller';
import {SpeciesService} from './species.service';
import {Species} from './entities/species.entity';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';
import {Planet} from '../planets/entities/planet.entity';
import mockSpeciesEntity from '../mocks/species/mockSpeciesEntity';

describe('PeopleController', () => {
    let controller: SpeciesController;
    let speciesService: SpeciesService;
    let speciesRepository: Repository<Species>;
    const species: Species[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SpeciesController],
            providers: [
                {
                    provide: SpeciesService,
                    useClass: SpeciesService
                },
                {
                    provide: getRepositoryToken(Species),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Film),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Person),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Planet),
                    useValue: () => {
                    }
                },
            ],
        }).compile();

        controller = module.get<SpeciesController>(SpeciesController);
        speciesRepository = module.get<Repository<Species>>(getRepositoryToken(Species));
    });

    it('Can add one species in DB.', async () => {
        jest.spyOn(controller['speciesService'], 'create').mockResolvedValue(mockSpeciesEntity);
        const result = await controller.create(mockSpeciesEntity);
        species.push(mockSpeciesEntity);
        expect(result).toEqual(mockSpeciesEntity);
    });

    it('Can find one species in DB.', async () => {
        const speciesId = 1;
        jest.spyOn(controller['speciesService'], 'findOne').mockImplementation(async () => {
            const oneSpecies = species.find(item => item.id === speciesId)
            return oneSpecies ? oneSpecies : null;
        });
        const result = await controller.findOne(speciesId);
        expect(result).toEqual(mockSpeciesEntity);
    });

    it('Throws Error. Find species in DB.', async () => {
        const speciesId = 0;
        jest.spyOn(controller['speciesService'], 'findOne').mockImplementation(async () => {
            const oneSpecies = species.find(item => item.id === speciesId)
            return oneSpecies ? oneSpecies : null;
        });
        await expect(controller.findOne(speciesId)).rejects.toThrow(NotFoundException);
    });
});
