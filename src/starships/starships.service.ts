import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Starship} from './entities/starship.entity';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';
import {Planet} from '../planets/entities/planet.entity';
import {CreateStarshipsDto} from './dto/create-starships.dto';
import {UpdateStarshipsDto} from './dto/update-starships.dto';

@Injectable()
export class StarshipsService {
    constructor(
        @InjectRepository(Starship)
        private starshipsRepository: Repository<Starship>,
    ) {
    }

    async create(createStarshipsDto: CreateStarshipsDto) {
        const starship = this.starshipsRepository.create(createStarshipsDto);

        // starships.films = createStarshipsDto.filmIds.map(id => ({...new Film(), id}));

        return this.starshipsRepository.save(starship);
    }

    async findAll() {
        return this.starshipsRepository.find({
            // relations: {
            //     films: true,
            //     people: true,
            //     planets: true,
            // },
            order: {id: 'DESC'},
            take: 10,
        });
    }

    async findOne(id: number) {
        return await this.starshipsRepository.findOne({
            where: {id},
            // relations: {
            //     films: true,
            //     people: true,
            //     planets: true,
            // }
        });
    }

    async update(id: number, updateStarshipsDto: UpdateStarshipsDto) {
        const starship = await this.findOne(id);

        if (!starship) throw new NotFoundException('No such starship!');

        const updatedSpecies = {...starship, ...updateStarshipsDto};

        return await this.starshipsRepository.save(updatedSpecies);
    }

    async remove(id: number) {
        const starship = await this.findOne(id);

        if (!starship) throw new NotFoundException('No such starship!');

        starship.deletedAt = new Date();
        await this.starshipsRepository.save(starship);

        return starship;
    }
}
