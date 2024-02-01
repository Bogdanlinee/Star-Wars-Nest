import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {StarshipsController} from './starships.controller';
import {StarshipsService} from './starships.service';
import {Starship} from './entities/starship.entity';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';

describe('StarshipController', () => {
    let controller: StarshipsController;
    let starshipRepository: Repository<Starship>;
    const starships: Starship[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StarshipsController],
            providers: [
                {
                    provide: StarshipsService,
                    useClass: StarshipsService
                },
                {
                    provide: getRepositoryToken(Starship),
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
            ],
        }).compile();

        controller = module.get<StarshipsController>(StarshipsController);
        starshipRepository = module.get<Repository<Starship>>(getRepositoryToken(Starship));
    });

    it('Can add one starship in DB.', async () => {
        jest.spyOn(controller['starshipsService'], 'create').mockResolvedValue(testStarshipEntity);
        const result = await controller.create(testStarshipEntity);
        starships.push(testStarshipEntity);
        expect(result).toEqual(testStarshipEntity);
    });

    it('Can find one starship in DB.', async () => {
        const starshipId = 1;
        jest.spyOn(controller['starshipsService'], 'findOne').mockImplementation(async () => {
            const starship = starships.find(item => item.id === starshipId)
            return starship ? starship : null;
        });
        const result = await controller.findOne(starshipId);
        expect(result).toEqual(testStarshipEntity);
    });

    it('Throws Error. Find starship in DB.', async () => {
        const starshipId = 0;
        jest.spyOn(controller['starshipsService'], 'findOne').mockImplementation(async () => {
            const starship = starships.find(item => item.id === starshipId)
            return starship ? starship : null;
        });
        await expect(controller.findOne(starshipId)).rejects.toThrow(NotFoundException);
    });

    const testStarshipEntity = {
        id: 1,
        name: "CR90 corvette",
        model: "CR90 corvette",
        manufacturer: "Corellian Engineering Corporation",
        cost_in_credits: "3500000",
        length: "150",
        max_atmosphering_speed: "950",
        crew: "30-165",
        passengers: "600",
        cargo_capacity: "3000000",
        consumables: "1 year",
        hyperdrive_rating: "2.0",
        MGLT: "60",
        starship_class: "corvette",
        pilotsIds: [],
        filmsIds: [],
        films: [],
        pilots: [],
        url: "https://swapi.dev/api/starships/1/",
        created: new Date(),
        edited: new Date(),
        deletedAt: new Date(),
    };
});
