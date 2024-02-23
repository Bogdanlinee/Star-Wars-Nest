import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {StarshipsService} from './starships.service';
import {Starship} from './entities/starship.entity';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';
import mockStarshipsEntity from '../mocks/starships/mockStarshipsEntity';

describe('starshipsService', () => {
    let starshipsService: StarshipsService;
    let starshipsRepository: Repository<Starship>;
    const starships: Starship[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StarshipsService,
                {
                    provide: getRepositoryToken(Starship),
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
            ],
        }).compile();

        starshipsService = module.get<StarshipsService>(StarshipsService);
        starshipsRepository = module.get<Repository<Starship>>(getRepositoryToken(Starship));
    });

    it('Can add a new starship to DB', async () => {
        jest.spyOn(starshipsRepository, 'save').mockResolvedValue(mockStarshipsEntity);
        jest.spyOn(starshipsRepository, 'create').mockReturnValue(mockStarshipsEntity);

        const result = await starshipsService.create(mockStarshipsEntity);

        starships.push(result);

        expect(result).toEqual(mockStarshipsEntity);
    });

    it('Can find a starship in DB', async () => {
        const starshipId = 1;

        jest.spyOn(starshipsRepository, 'findOne').mockImplementation(async () => {
            const starship = starships.find(item => item.id === starshipId)
            return starship ? starship : null;
        });

        const result = await starshipsService.findOne(starshipId);

        expect(result).toEqual(starships[0]);
    });

    it('Throws Error. Find starship in DB to remove it', async () => {
        const starshipId = 10;

        jest.spyOn(starshipsRepository, 'findOne').mockImplementation(async () => {
            const starship = starships.find(item => item.id === starshipId)
            return starship ? starship : null;
        });
        jest.spyOn(starshipsRepository, 'save').mockResolvedValue(mockStarshipsEntity);

        await expect(starshipsService.remove(starshipId)).rejects.toThrow(NotFoundException);
    });

    it('Can find starship in DB to remove it', async () => {
        const starshipId = 1;
        const starshipToDelete = {
            ...mockStarshipsEntity,
            deletedAt: new Date(),
        };

        jest.spyOn(starshipsRepository, 'save').mockResolvedValue(starshipToDelete);
        jest.spyOn(starshipsRepository, 'create').mockReturnValue(starshipToDelete);
        jest.spyOn(starshipsRepository, 'findOne').mockImplementation(async () => {
            const starship = starships.find(item => item.id === starshipId)
            return starship ? starship : null;
        });

        const result = await starshipsService.remove(starshipId);

        expect(result).toBeDefined();
    });
});