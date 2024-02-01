import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Species} from './entities/species.entity';
import {CreateSpeciesDto} from './dto/create-species.dto';
import {UpdateSpeciesDto} from './dto/update-species.dto';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';
import {Planet} from '../planets/entities/planet.entity';
import {appendEntities} from '../utils/appendRelationEntities';

@Injectable()
export class SpeciesService {
    constructor(
        @InjectRepository(Species)
        private speciesRepository: Repository<Species>,
        @InjectRepository(Film)
        private filmsRepository: Repository<Film>,
        @InjectRepository(Person)
        private peopleRepository: Repository<Person>,
        @InjectRepository(Planet)
        private planetsRepository: Repository<Planet>,
    ) {
    }

    async create(createSpeciesDto: CreateSpeciesDto) {
        const species = this.speciesRepository.create(createSpeciesDto);

        await appendEntities(species, createSpeciesDto, 'filmIds', 'films', this.filmsRepository);
        await appendEntities(species, createSpeciesDto, 'peopleIds', 'people', this.peopleRepository);
        await appendEntities(species, createSpeciesDto, 'planetsIds', 'planets', this.planetsRepository);

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

        await appendEntities(updatedSpecies, updateSpeciesDto, 'filmIds', 'films', this.filmsRepository);
        await appendEntities(updatedSpecies, updateSpeciesDto, 'peopleIds', 'people', this.peopleRepository);
        await appendEntities(updatedSpecies, updateSpeciesDto, 'planetsIds', 'planets', this.planetsRepository);

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
