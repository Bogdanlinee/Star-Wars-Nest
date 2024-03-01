import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {CreatePlanetsDto} from './dto/create-planets.dto';
import {UpdatePlanetsDto} from './dto/update-planets.dto';
import {Planet} from './entities/planet.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Person} from '../people/entities/person.entity';
import {Film} from '../films/entities/film.entity';
import {Species} from '../species/entities/species.entity';
import {appendEntities} from '../utils/appendRelationEntities';

@Injectable()
export class PlanetsService {
    constructor(
        @InjectRepository(Planet)
        private planetsRepository: Repository<Planet>,
        @InjectRepository(Person)
        private peopleRepository: Repository<Person>,
        @InjectRepository(Film)
        private filmsRepository: Repository<Film>,
        @InjectRepository(Species)
        private speciesRepository: Repository<Species>,
    ) {
    }

    async create(createPlanetsDto: CreatePlanetsDto) {
        let planet = this.planetsRepository.create(createPlanetsDto);

        await appendEntities(planet, createPlanetsDto, 'residentIds', 'residents', this.peopleRepository);
        await appendEntities(planet, createPlanetsDto, 'filmIds', 'films', this.filmsRepository);
        await appendEntities(planet, createPlanetsDto, 'speciesIds', 'species', this.speciesRepository);

        planet = await this.planetsRepository.save(planet);
        planet.url = `localhost:3000/planets/${planet.id}`;

        return this.planetsRepository.save(planet);
    }

    async findOne(id: number) {
        return await this.planetsRepository.findOne({
            where: {id},
            relations: {
                residents: true,
                films: true,
                species: true,
            },
            relationLoadStrategy: 'query',
        });
    }

    async findAll() {
        return this.planetsRepository.find({
            relations: {
                residents: true,
                films: true,
                species: true,
            },
            relationLoadStrategy: 'query',
            order: {id: 'DESC'},
            take: 10,
        });
    }

    async update(id: number, updatePlanetsDto: UpdatePlanetsDto) {
        const planet = await this.findOne(id);

        if (!planet) throw new NotFoundException('No such planet!');

        const updatedPlanet = {...planet, ...updatePlanetsDto};

        await appendEntities(updatedPlanet, updatePlanetsDto, 'residentIds', 'residents', this.peopleRepository);
        await appendEntities(updatedPlanet, updatePlanetsDto, 'filmIds', 'films', this.filmsRepository);
        await appendEntities(updatedPlanet, updatePlanetsDto, 'speciesIds', 'species', this.speciesRepository);

        return await this.planetsRepository.save(updatedPlanet);
    }

    async remove(id: number) {
        const planet = await this.findOne(id);

        if (!planet) throw new NotFoundException('No such planet!');

        planet.deletedAt = new Date();
        await this.planetsRepository.save(planet);

        return planet;
    }
}
