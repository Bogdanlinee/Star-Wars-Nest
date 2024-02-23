import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Film} from './entities/film.entity';
import {FilmsService} from './films.service';
import {NotFoundException} from '@nestjs/common';
import {Species} from '../species/entities/species.entity';
import {Planet} from '../planets/entities/planet.entity';
import {Starship} from '../starships/entities/starship.entity';
import {Vehicle} from '../vehicles/entities/vehicle.entity';
import {Person} from '../people/entities/person.entity';
import mockFilmsEntity from '../mocks/films/mockFilmsEntity';

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
                },
                {
                    provide: getRepositoryToken(Species),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Planet),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Starship),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Vehicle),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Person),
                    useClass: Repository,
                },
            ],
        }).compile();

        filmsService = module.get<FilmsService>(FilmsService);
        filmsRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
    });

    it('Can add a new film to DB', async () => {
        jest.spyOn(filmsRepository, 'save').mockResolvedValue(mockFilmsEntity);
        jest.spyOn(filmsRepository, 'create').mockReturnValue(mockFilmsEntity);

        const result = await filmsService.create(mockFilmsEntity);

        films.push(result);

        expect(result).toEqual(mockFilmsEntity);
    });

    it('Can find film in DB', async () => {
        const filmId = 1;

        jest.spyOn(filmsRepository, 'findOne').mockImplementation(async () => {
            const person = films.find(item => item.id === filmId)
            return person ? person : null;
        });

        const result = await filmsService.findOne(filmId);

        expect(result).toEqual(films[0]);
    });

    it('Throws Error. Find film in DB to remove it', async () => {
        const filmId = 10;

        jest.spyOn(filmsRepository, 'findOne').mockImplementation(async () => {
            const person = films.find(item => item.id === filmId)
            return person ? person : null;
        });
        jest.spyOn(filmsRepository, 'save').mockResolvedValue(mockFilmsEntity);

        await expect(filmsService.remove(filmId)).rejects.toThrow(NotFoundException);
    });

    it('Can find film in DB to remove it', async () => {
        const filmId = 1;
        const filmToDelete = {
            ...mockFilmsEntity,
            deletedAt: new Date(),
        };

        jest.spyOn(filmsRepository, 'save').mockResolvedValue(filmToDelete);
        jest.spyOn(filmsRepository, 'create').mockReturnValue(filmToDelete);
        jest.spyOn(filmsRepository, 'findOne').mockImplementation(async () => {
            const person = films.find(item => item.id === filmId)
            return person ? person : null;
        });

        const result = await filmsService.remove(filmId);

        expect(result).toBeDefined();
    });
});