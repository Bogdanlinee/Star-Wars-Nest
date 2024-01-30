import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Species} from './entities/species.entity';
import {CreateSpeciesDto} from './dto/create-species.dto';
import {UpdateSpeciesDto} from './dto/update-species.dto';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';
import {Planet} from '../planets/entities/planet.entity';

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
        species.planets = createSpeciesDto.planetsIds.map(id => ({...new Planet(), id}));

        return this.speciesRepository.save(species);
    }

    async findOne(id: number) {
        return await this.speciesRepository.findOne({
            where: {id},
            relations: {
                films: true,
                people: true,
                planets: true,
            },
            relationLoadStrategy: 'query',
        });
    }

    async findAll() {
        return this.speciesRepository.find({
            relations: {
                films: true,
                people: true,
                planets: true,
            },
            relationLoadStrategy: 'query',
            order: {id: 'DESC'},
            take: 10,
        });
    }

    async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
        const species = await this.findOne(id);

        if (!species) throw new NotFoundException('No such species!');

        const updatedSpecies = {...species, ...updateSpeciesDto};

        if (updateSpeciesDto.filmIds) {
            updatedSpecies.films = updateSpeciesDto.filmIds.map(id => ({...new Film(), id}));
        }

        if (updateSpeciesDto.peopleIds) {
            updatedSpecies.people = updateSpeciesDto.peopleIds.map(id => ({...new Person(), id}));
        }

        if (updateSpeciesDto.planetsIds) {
            updatedSpecies.planets = updateSpeciesDto.planetsIds.map(id => ({...new Planet(), id}));
        }

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
