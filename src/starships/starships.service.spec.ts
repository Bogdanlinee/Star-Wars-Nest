import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {StarshipsService} from './starships.service';
import {Starship} from './entities/starship.entity';

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
                }
            ],
        }).compile();

        starshipsService = module.get<StarshipsService>(StarshipsService);
        starshipsRepository = module.get<Repository<Starship>>(getRepositoryToken(Starship));
    });

    it('Can add a new starship to DB', async () => {
        jest.spyOn(starshipsRepository, 'save').mockResolvedValue(testStarshipEntity);
        jest.spyOn(starshipsRepository, 'create').mockReturnValue(testStarshipEntity);

        const result = await starshipsService.create(testStarshipEntity);

        starships.push(result);

        expect(result).toEqual(testStarshipEntity);
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
        jest.spyOn(starshipsRepository, 'save').mockResolvedValue(testStarshipEntity);

        await expect(starshipsService.remove(starshipId)).rejects.toThrow(NotFoundException);
    });

    it('Can find starship in DB to remove it', async () => {
        const starshipId = 1;
        const starshipToDelete = {
            ...testStarshipEntity,
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