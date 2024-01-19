import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {CreatePlanetsDto} from './dto/create-planets.dto';
import {UpdatePlanetsDto} from './dto/update-planets.dto';
import {Planet} from './entities/planet.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Person} from '../people/entities/person.entity';

@Injectable()
export class PlanetsService {
    constructor(
        @InjectRepository(Planet)
        private planetsRepository: Repository<Planet>
    ) {
    }

    async create(createPlanetsDto: CreatePlanetsDto) {
        const planet = this.planetsRepository.create(createPlanetsDto);

        planet.residents = createPlanetsDto.residentIds.map(id => ({...new Person(), id}));
        // person.species = createPersonDto.speciesIds.map(id => ({...new Species(), id}))

        return this.planetsRepository.save(planet);
    }

    async findAll() {
        return this.planetsRepository.find({
            relations: {
                residents: true,
            },
            order: {id: 'DESC'},
            take: 10,
        });
    }

    async findOne(id: number) {
        return await this.planetsRepository.findOne({
            where: {id},
                relations: {
                    residents: true,
                }
        });
    }

    async update(id: number, updatePlanetsDto: UpdatePlanetsDto) {
        const planet = await this.findOne(id);

        if (!planet) throw new NotFoundException('No such planet!');

        const updatedPlanet = {...planet, ...updatePlanetsDto};

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
