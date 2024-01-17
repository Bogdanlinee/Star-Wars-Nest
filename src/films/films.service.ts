import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Film} from './entities/film.entity';
import {CreateFilmDto} from './dto/create-film.dto';
import {UpdateFilmDto} from './dto/update-film.dto';
import {Person} from '../people/entities/person.entity';

@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Film) private filmsRepository: Repository<Film>,
    ) {
    }

    async create(createFilmDto: CreateFilmDto) {
        const film = this.filmsRepository.create(createFilmDto);

        film.characters = createFilmDto.personIds.map(id => ({...new Person(), id}));

        return this.filmsRepository.save(film);
    }

    async findOne(id: number) {
        return this.filmsRepository.findOne({
            where: {id},
            relations: {
                characters: true,
                species: true,
            }
        });
    }

    async findAll() {
        return this.filmsRepository.find({
            relations: {
                characters: true,
                species: true,
            },
            take: 10
        });
    }

    async update(id: number, updateFilmDto: UpdateFilmDto) {
        const film = await this.findOne(id);

        if (!film) throw new NotFoundException('No such film!');

        const updatedFilm = {...film, ...updateFilmDto};

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
