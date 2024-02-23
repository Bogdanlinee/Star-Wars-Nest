import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {NotFoundException} from '@nestjs/common';
import {FilmsController} from './films.controller';
import {Film} from './entities/film.entity';
import {FilmsService} from './films.service';
import {Species} from '../species/entities/species.entity';
import {Planet} from '../planets/entities/planet.entity';
import {Starship} from '../starships/entities/starship.entity';
import {Vehicle} from '../vehicles/entities/vehicle.entity';
import {Person} from '../people/entities/person.entity';
import mockFilmsEntity from '../mocks/films/mockFilmsEntity';

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
                {
                    provide: getRepositoryToken(Species),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Planet),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Starship),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Vehicle),
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

        controller = module.get<FilmsController>(FilmsController);
        filmRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
    });

    it('Can add one film in DB.', async () => {
        jest.spyOn(controller['filmsService'], 'create').mockResolvedValue(mockFilmsEntity);
        const result = await controller.create(mockFilmsEntity);
        films.push(mockFilmsEntity);
        expect(result).toEqual(mockFilmsEntity);
    });

    it('Can find one film in DB.', async () => {
        const filmId = 1;
        jest.spyOn(controller['filmsService'], 'findOne').mockImplementation(async () => {
            const film = films.find(item => item.id === filmId)
            return film ? film : null;
        });
        const result = await controller.findOne(filmId);
        expect(result).toEqual(mockFilmsEntity);
    });

    it('Throws Error. Find film in DB.', async () => {
        const filmId = 0;
        jest.spyOn(controller['filmsService'], 'findOne').mockImplementation(async () => {
            const film = films.find(item => item.id === filmId)
            return film ? film : null;
        });
        await expect(controller.findOne(filmId)).rejects.toThrow(NotFoundException);
    });
});
