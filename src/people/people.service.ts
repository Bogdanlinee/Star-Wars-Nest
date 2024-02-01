import {Injectable} from '@nestjs/common';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Person} from './entities/person.entity';
import {Repository} from 'typeorm';
import {NotFoundException} from '@nestjs/common';
import {ImagePerson} from '../images/entities/image.person.entity';
import {Film} from '../films/entities/film.entity';
import {Species} from '../species/entities/species.entity';
import {Planet} from '../planets/entities/planet.entity';
import {Starship} from '../starships/entities/starship.entity';
import {Vehicle} from '../vehicles/entities/vehicle.entity';
import {appendEntities} from '../utils/appendRelationEntities';

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>,
        @InjectRepository(ImagePerson)
        private imagePersonRepository: Repository<ImagePerson>,
        @InjectRepository(Film)
        private filmsRepository: Repository<Film>,
        @InjectRepository(Species)
        private speciesRepository: Repository<Species>,
        @InjectRepository(Planet)
        private planetsRepository: Repository<Planet>,
        @InjectRepository(Starship)
        private starshipsRepository: Repository<Starship>,
        @InjectRepository(Vehicle)
        private vehiclesRepository: Repository<Vehicle>
    ) {
    }

    async create(createPersonDto: CreatePersonDto) {
        const person = this.personRepository.create(createPersonDto);

        await appendEntities(person, createPersonDto, 'filmIds', 'films', this.filmsRepository);
        await appendEntities(person, createPersonDto, 'speciesIds', 'species', this.speciesRepository);
        await appendEntities(person, createPersonDto, 'starshipIds', 'starships', this.starshipsRepository);
        await appendEntities(person, createPersonDto, 'vehicleIds', 'vehicles', this.vehiclesRepository);

        const planetId = createPersonDto.homeworldId;
        const planetEntity = await this.planetsRepository.findOne({where: {id: planetId}});

        if (planetEntity) {
            person.homeworld = planetEntity;
        }

        return this.personRepository.save(person);
    }

    async findOne(id: number) {
        return await this.personRepository.findOne({
            where: {id},
            relations: {
                images: true,
                films: true,
                species: true,
                starships: true,
                homeworld: true,
                vehicles: true,
            },
            relationLoadStrategy: 'query',
        });
    }

    async findAll() {
        return this.personRepository.find({
            relations: {
                images: true,
                films: true,
                species: true,
                starships: true,
                homeworld: true,
                vehicles: true,
            },
            relationLoadStrategy: 'query',
            order: {id: 'DESC'},
            take: 10,
        });
    }

    async update(id: number, updatePersonDto: UpdatePersonDto) {
        const person = await this.findOne(id);

        if (!person) throw new NotFoundException('No such user!');

        const updatedPerson = {...person, ...updatePersonDto};

        await appendEntities(updatedPerson, updatePersonDto, 'filmIds', 'films', this.filmsRepository);
        await appendEntities(updatedPerson, updatePersonDto, 'speciesIds', 'species', this.speciesRepository);
        await appendEntities(updatedPerson, updatePersonDto, 'starshipIds', 'starships', this.starshipsRepository);
        await appendEntities(updatedPerson, updatePersonDto, 'vehicleIds', 'vehicles', this.vehiclesRepository);

        const planetId = updatePersonDto.homeworldId;

        const planetEntity = await this.planetsRepository.findOne({where: {id: planetId}});

        if (planetEntity) {
            updatedPerson.homeworld = planetEntity;
        }

        return await this.personRepository.save(updatedPerson);
    }

    async remove(id: number) {
        const person = await this.findOne(id);

        if (!person) throw new NotFoundException('No such user!');

        person.deletedAt = new Date();
        await this.personRepository.save(person);

        const personImages = person.images;

        for (const imageEntity of personImages) {
            imageEntity.deletedAt = new Date();
            await this.imagePersonRepository.save(imageEntity);
        }

        return person;
    }
}