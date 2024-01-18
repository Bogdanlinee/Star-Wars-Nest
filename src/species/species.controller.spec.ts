import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {SpeciesController} from './species.controller';
import {SpeciesService} from './species.service';
import {Species} from './entities/species.entity';

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
            ],
        }).compile();

        controller = module.get<SpeciesController>(SpeciesController);
        speciesRepository = module.get<Repository<Species>>(getRepositoryToken(Species));
    });

    it('Can add one species in DB.', async () => {
        jest.spyOn(controller['speciesService'], 'create').mockResolvedValue(testSpeciesEntity);
        const result = await controller.create(testSpeciesEntity);
        species.push(testSpeciesEntity);
        expect(result).toEqual(testSpeciesEntity);
    });

    it('Can find one species in DB.', async () => {
        const speciesId = 1;
        jest.spyOn(controller['speciesService'], 'findOne').mockImplementation(async () => {
            const oneSpecies = species.find(item => item.id === speciesId)
            return oneSpecies ? oneSpecies : null;
        });
        const result = await controller.findOne(speciesId);
        expect(result).toEqual(testSpeciesEntity);
    });

    it('Throws Error. Find species in DB.', async () => {
        const speciesId = 0;
        jest.spyOn(controller['speciesService'], 'findOne').mockImplementation(async () => {
            const oneSpecies = species.find(item => item.id === speciesId)
            return oneSpecies ? oneSpecies : null;
        });
        await expect(controller.findOne(speciesId)).rejects.toThrow(NotFoundException);
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
