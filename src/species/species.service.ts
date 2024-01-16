import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Species} from './entities/species.entity';
import {CreateSpeciesDto} from './dto/create-species.dto';
import {UpdateSpeciesDto} from './dto/update-species.dto';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';

@Injectable()
export class SpeciesService {
    constructor(
        @InjectRepository(Species)
        private speciesRepository: Repository<Species>,
    ) {
    }

    async create(createSpeciesDto: CreateSpeciesDto) {
        const species = this.speciesRepository.create(createSpeciesDto);

        species.films = createSpeciesDto.filmIds.map(id => ({...new Film(), id}));
        species.people = createSpeciesDto.peopleIds.map(id => ({...new Person(), id}));

        return this.speciesRepository.save(species);
    }

    async findAll() {
        return this.speciesRepository.find({
            relations: {
                films: true,
                people: true,
            },
            order: {id: 'DESC'},
            take: 10,
        });
    }

    async findOne(id: number) {
        return await this.speciesRepository.findOne({
            where: {id},
            relations: {
                films: true,
                people: true,
            }
        });
    }

    async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
        const species = await this.findOne(id);

        if (!species) throw new NotFoundException('No such species!');

        const updatedSpecies = {...species, ...updateSpeciesDto};

        return await this.speciesRepository.save(updatedSpecies);
    }

    async remove(id: number) {
        const species = await this.findOne(id);

        if (!species) throw new NotFoundException('No such species!');

        species.deletedAt = new Date();
        await this.speciesRepository.save(species);

        return species;
    }
}
