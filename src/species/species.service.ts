import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Species} from './entities/species.entity';
import {UpdatePersonDto} from '../people/dto/update-person.dto';
import {CreateSpeciesDto} from './dto/create-species.dto';

@Injectable()
export class SpeciesService {
    constructor(
        @InjectRepository(Species)
        private speciesRepository: Repository<Species>,
    ) {
    }

    async create(createSpeciesDto: CreateSpeciesDto) {
        const species = this.speciesRepository.create(createSpeciesDto);
        return this.speciesRepository.save(species);
    }

    async findAll() {
        return this.speciesRepository.find({
            relations: {},
            order: {id: 'DESC'},
            take: 10,
        });
    }

    async findOne(id: number) {
        return await this.speciesRepository.findOne({
            where: {id},
            relations: {}
        });
    }

    async update(id: number, updateSpeciesDto: UpdatePersonDto) {
        const species = await this.findOne(id);

        if (!species) throw new NotFoundException('No such species!');

        const updatedSpecies = {...species, ...updateSpeciesDto};

        return await this.speciesRepository.save(updatedSpecies);
    }

    async remove(id: number) {
        const species = await this.findOne(id);

        if (!species) throw new NotFoundException('No such user!');

        species.deletedAt = new Date();
        await this.speciesRepository.save(species);

        return species;
    }
}
