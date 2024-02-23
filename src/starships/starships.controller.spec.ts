import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {StarshipsController} from './starships.controller';
import {StarshipsService} from './starships.service';
import {Starship} from './entities/starship.entity';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';
import mockStarshipsEntity from '../mocks/starships/mockStarshipsEntity';

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
        jest.spyOn(controller['starshipsService'], 'create').mockResolvedValue(mockStarshipsEntity);
        const result = await controller.create(mockStarshipsEntity);
        starships.push(mockStarshipsEntity);
        expect(result).toEqual(mockStarshipsEntity);
    });

    it('Can find one starship in DB.', async () => {
        const starshipId = 1;
        jest.spyOn(controller['starshipsService'], 'findOne').mockImplementation(async () => {
            const starship = starships.find(item => item.id === starshipId)
            return starship ? starship : null;
        });
        const result = await controller.findOne(starshipId);
        expect(result).toEqual(mockStarshipsEntity);
    });

    it('Throws Error. Find starship in DB.', async () => {
        const starshipId = 0;
        jest.spyOn(controller['starshipsService'], 'findOne').mockImplementation(async () => {
            const starship = starships.find(item => item.id === starshipId)
            return starship ? starship : null;
        });
        await expect(controller.findOne(starshipId)).rejects.toThrow(NotFoundException);
    });
});
