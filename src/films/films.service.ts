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

@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Film) private filmsRepository: Repository<Film>,
    ) {
    }

    async create(createFilmDto: CreateFilmDto) {
        const film = this.filmsRepository.create(createFilmDto);

        film.characters = createFilmDto.personIds.map(id => ({...new Person(), id}));
        film.species = createFilmDto.speciesIds.map(id => ({...new Species(), id}));
        film.planets = createFilmDto.planetIds.map(id => ({...new Planet(), id}));
        film.starships = createFilmDto.starshipIds.map(id => ({...new Starship(), id}));
        film.vehicles = createFilmDto.vehicleIds.map(id => ({...new Vehicle(), id}));

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

        if (updateFilmDto.personIds) {
            updatedFilm.characters = updateFilmDto.personIds.map(id => ({...new Person(), id}))
        }

        if (updateFilmDto.speciesIds) {
            updatedFilm.species = updateFilmDto.speciesIds.map(id => ({...new Species(), id}));
        }

        if (updateFilmDto.planetIds) {
            updatedFilm.planets = updateFilmDto.planetIds.map(id => ({...new Planet(), id}));
        }

        if (updateFilmDto.starshipIds) {
            updatedFilm.starships = updateFilmDto.starshipIds.map(id => ({...new Starship(), id}));
        }

        if (updateFilmDto.vehicleIds) {
            updatedFilm.vehicles = updateFilmDto.vehicleIds.map(id => ({...new Vehicle(), id}));
        }

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
