import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Film} from './entities/film.entity';
import {CreateFilmDto} from './dto/create-film.dto';

@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Film) private filmsRepository: Repository<Film>,
    ) {
    }

    async create(createFilmDto: CreateFilmDto) {
        console.log(createFilmDto);
        return this.filmsRepository.save(createFilmDto);
    }
}
