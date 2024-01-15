import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Film} from './entities/film.entity';
import {FilmsService} from './films.service';
import {NotFoundException} from '@nestjs/common';

describe('FilmsService', () => {
    let filmsService: FilmsService;
    let filmsRepository: Repository<Film>;
    const films: Film[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FilmsService,
                {
                    provide: getRepositoryToken(Film),
                    useClass: Repository,
                }
            ],
        }).compile();

        filmsService = module.get<FilmsService>(FilmsService);
        filmsRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
    });

    it('Can add a new film to DB', async () => {
        jest.spyOn(filmsRepository, 'save').mockResolvedValue(testFilmEntity);
        jest.spyOn(filmsRepository, 'create').mockReturnValue(testFilmEntity);

        const result = await filmsService.create(testFilmEntity);

        films.push(result);

        expect(result).toEqual(testFilmEntity);
    });

    it('Can find film person in DB', async () => {
        const personId = 1;

        jest.spyOn(filmsRepository, 'findOne').mockImplementation(async () => {
            const person = films.find(item => item.id === personId)
            return person ? person : null;
        });

        const result = await filmsService.findOne(personId);

        expect(result).toEqual(films[0]);
    });

    it('Throws Error. Find film in DB to remove it', async () => {
        const personId = 10;

        jest.spyOn(filmsRepository, 'findOne').mockImplementation(async () => {
            const person = films.find(item => item.id === personId)
            return person ? person : null;
        });
        jest.spyOn(filmsRepository, 'save').mockResolvedValue(testFilmEntity);

        await expect(filmsService.remove(personId)).rejects.toThrow(NotFoundException);
    });

    it('Can find person in DB to remove it', async () => {
        const personId = 1;
        const personToDelete = {
            ...testFilmEntity,
            deletedAt: new Date(),
        };

        jest.spyOn(filmsRepository, 'save').mockResolvedValue(personToDelete);
        jest.spyOn(filmsRepository, 'create').mockReturnValue(personToDelete);
        jest.spyOn(filmsRepository, 'findOne').mockImplementation(async () => {
            const person = films.find(item => item.id === personId)
            return person ? person : null;
        });

        const result = await filmsService.remove(personId);

        expect(result).toBeDefined();
    });

    const testFilmEntity = {
        id: 1,
        title: "The Phantom Menace 1",
        episode_id: 1,
        opening_crawl: "Test Value",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "1999-05-19",
        characters: [],
        personIds: [],
        url: "https://swapi.dev/api/films/4/",
        created: new Date(),
        edited: new Date(),
        deletedAt: new Date(),
    };
});