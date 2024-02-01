import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Starship} from './entities/starship.entity';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';
import {CreateStarshipsDto} from './dto/create-starships.dto';
import {UpdateStarshipsDto} from './dto/update-starships.dto';
import {appendEntities} from '../utils/appendRelationEntities';

@Injectable()
export class StarshipsService {
    constructor(
        @InjectRepository(Starship)
        private starshipsRepository: Repository<Starship>,
        @InjectRepository(Film)
        private filmsRepository: Repository<Film>,
        @InjectRepository(Person)
        private peopleRepository: Repository<Person>,
    ) {
    }

    async create(createStarshipsDto: CreateStarshipsDto) {
        const starship = this.starshipsRepository.create(createStarshipsDto);

        await appendEntities(starship, createStarshipsDto, 'filmsIds', 'films', this.filmsRepository);
        await appendEntities(starship, createStarshipsDto, 'pilotsIds', 'pilots', this.peopleRepository);

        // starship.films = createStarshipsDto.filmsIds.map(id => ({...new Film(), id}));
        // starship.pilots = createStarshipsDto.pilotsIds.map(id => ({...new Person(), id}));

        return this.starshipsRepository.save(starship);
    }

    async findOne(id: number) {
        return await this.starshipsRepository.findOne({
            where: {id},
            relations: {
                films: true,
                pilots: true,
            },
            relationLoadStrategy: 'query',
        });
    }

    async findAll() {
        return this.starshipsRepository.find({
            relations: {
                films: true,
                pilots: true,
            },
            relationLoadStrategy: 'query',
            order: {id: 'DESC'},
            take: 10,
        });
    }

    async update(id: number, updateStarshipsDto: UpdateStarshipsDto) {
        const starship = await this.findOne(id);

        if (!starship) throw new NotFoundException('No such starship!');

        const updatedStarship = {...starship, ...updateStarshipsDto};

        await appendEntities(updatedStarship, updateStarshipsDto, 'filmsIds', 'films', this.filmsRepository);
        await appendEntities(updatedStarship, updateStarshipsDto, 'pilotsIds', 'pilots', this.peopleRepository);


        // if (updateStarshipsDto.filmsIds) {
        //     updatedStarship.films = updateStarshipsDto.filmsIds.map(id => ({...new Film(), id}));
        // }
        //
        // if (updateStarshipsDto.pilotsIds) {
        //     updatedStarship.pilots = updateStarshipsDto.pilotsIds.map(id => ({...new Person(), id}));
        // }

        return await this.starshipsRepository.save(updatedStarship);
    }

    async remove(id: number) {
        const starship = await this.findOne(id);

        if (!starship) throw new NotFoundException('No such starship!');

        starship.deletedAt = new Date();
        await this.starshipsRepository.save(starship);

        return starship;
    }
}