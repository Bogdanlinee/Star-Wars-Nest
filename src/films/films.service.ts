import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Film} from './entities/film.entity';
import {CreateFilmDto} from './dto/create-film.dto';
import {UpdateFilmDto} from './dto/update-film.dto';
import {Person} from '../people/entities/person.entity';
import {Species} from '../species/entities/species.entity';
import {Planet} from '../planets/entities/planet.entity';
import {Starship} from '../starships/entities/starship.entity';
import {Vehicle} from '../vehicles/entities/vehicle.entity';
import {appendEntities} from '../utils/appendRelationEntities';

@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Film) private filmsRepository: Repository<Film>,
        @InjectRepository(Person) private charactersRepository: Repository<Person>,
        @InjectRepository(Species) private speciesRepository: Repository<Species>,
        @InjectRepository(Planet) private planetsRepository: Repository<Planet>,
        @InjectRepository(Starship) private starshipsRepository: Repository<Starship>,
        @InjectRepository(Vehicle) private vehiclesRepository: Repository<Vehicle>,
    ) {
    }

    async create(createFilmDto: CreateFilmDto) {
        let film = this.filmsRepository.create(createFilmDto);

        await appendEntities(film, createFilmDto, 'personIds', 'characters', this.charactersRepository);
        await appendEntities(film, createFilmDto, 'planetIds', 'planets', this.planetsRepository);
        await appendEntities(film, createFilmDto, 'speciesIds', 'species', this.speciesRepository);
        await appendEntities(film, createFilmDto, 'starshipIds', 'starships', this.starshipsRepository);
        await appendEntities(film, createFilmDto, 'vehicleIds', 'vehicles', this.vehiclesRepository);

        film = await this.filmsRepository.save(film);
        film.url = `localhost:3000/films/${film.id}`;

        return this.filmsRepository.save(film);
    }

    async findOne(id: number) {
        return this.filmsRepository.findOne({
            where: {id},
            relations: {
                characters: true,
                species: true,
                planets: true,
                starships: true,
                vehicles: true,
            },
            relationLoadStrategy: 'query',
        });
    }

    async findAll() {
        return this.filmsRepository.find({
            relations: {
                characters: true,
                species: true,
                planets: true,
                starships: true,
                vehicles: true,
            },
            relationLoadStrategy: 'query',
            order: {id: 'DESC'},
            take: 10
        });
    }

    async update(id: number, updateFilmDto: UpdateFilmDto) {
        const film = await this.findOne(id);

        if (!film) throw new NotFoundException('No such film!');

        const updatedFilm = {...film, ...updateFilmDto};

        await appendEntities(updatedFilm, updateFilmDto, 'personIds', 'characters', this.charactersRepository);
        await appendEntities(updatedFilm, updateFilmDto, 'planetIds', 'planets', this.planetsRepository);
        await appendEntities(updatedFilm, updateFilmDto, 'speciesIds', 'species', this.speciesRepository);
        await appendEntities(updatedFilm, updateFilmDto, 'starshipIds', 'starships', this.starshipsRepository);
        await appendEntities(updatedFilm, updateFilmDto, 'vehicleIds', 'vehicles', this.vehiclesRepository);

        return await this.filmsRepository.save(updatedFilm);
    }

    async remove(id: number) {
        const film = await this.findOne(id);

        if (!film) throw new NotFoundException('No such film!');

        film.deletedAt = new Date();
        await this.filmsRepository.save(film);

        return film;
    }
}
