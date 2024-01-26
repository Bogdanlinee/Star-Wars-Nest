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

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>,
        @InjectRepository(ImagePerson)
        private imagePersonRepository: Repository<ImagePerson>
    ) {
    }

    async create(createPersonDto: CreatePersonDto) {
        const person = this.personRepository.create(createPersonDto);

        person.films = createPersonDto.filmIds.map(id => ({...new Film(), id}));
        person.species = createPersonDto.speciesIds.map(id => ({...new Species(), id}))
        person.starships = createPersonDto.starshipIds.map(id => ({...new Starship(), id}))
        person.vehicles = createPersonDto.vehicleIds.map(id => ({...new Vehicle(), id}))
        person.homeworld = {...new Planet(), id: createPersonDto.homeworldId};

        return this.personRepository.save(person);
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
            order: {id: 'DESC'},
            take: 10,
        });
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
            }
        });
    }

    async update(id: number, updatePersonDto: UpdatePersonDto) {
        const person = await this.findOne(id);

        if (!person) throw new NotFoundException('No such user!');

        const updatedPerson = {...person, ...updatePersonDto};

        if (updatePersonDto.filmIds) {
            updatedPerson.films = updatePersonDto.filmIds.map(id => ({...new Film(), id}))
        }
        if (updatePersonDto.speciesIds) {
            updatedPerson.species = updatePersonDto.speciesIds.map(id => ({...new Species(), id}))
        }
        if (updatePersonDto.starshipIds) {
            updatedPerson.starships = updatePersonDto.starshipIds.map(id => ({...new Starship(), id}))
        }
        if (updatePersonDto.vehicleIds) {
            updatedPerson.vehicles = updatePersonDto.vehicleIds.map(id => ({...new Vehicle(), id}))
        }
        if (updatePersonDto.homeworldId) {
            updatedPerson.homeworld = {...new Planet(), id: updatePersonDto.homeworldId};
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