import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {FilmsController} from './films.controller';
import {Film} from './entities/film.entity';
import {FilmsService} from './films.service';

describe('PeopleController', () => {
    let controller: FilmsController;
    let filmRepository: Repository<Film>;
    const films: Film[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FilmsController],
            providers: [
                {
                    provide: FilmsService,
                    useClass: FilmsService
                },
                {
                    provide: getRepositoryToken(Film),
                    useValue: () => {
                    },
                },
            ],
        }).compile();

        controller = module.get<FilmsController>(FilmsController);
        filmRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
    });

    it('Can add one film in DB.', async () => {
        jest.spyOn(controller['filmsService'], 'create').mockResolvedValue(testFilmEntity);
        const result = await controller.create(testFilmEntity);
        films.push(testFilmEntity);
        expect(result).toEqual(testFilmEntity);
    });

    it('Can find one film in DB.', async () => {
        const personId = 1;
        jest.spyOn(controller['filmsService'], 'findOne').mockImplementation(async () => {
            const person = films.find(item => item.id === personId)
            return person ? person : null;
        });
        const result = await controller.findOne(personId);
        expect(result).toEqual(testFilmEntity);
    });

    it('Throws Error. Find film in DB.', async () => {
        const personId = 0;
        jest.spyOn(controller['filmsService'], 'findOne').mockImplementation(async () => {
            const person = films.find(item => item.id === personId)
            return person ? person : null;
        });
        await expect(controller.findOne(personId)).rejects.toThrow(NotFoundException);
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
        planets: [],
        species: [],
        speciesIds: [],
        planetIds: [],
        url: "https://swapi.dev/api/films/4/",
        created: new Date(),
        edited: new Date(),
        deletedAt: new Date(),
    };
});
