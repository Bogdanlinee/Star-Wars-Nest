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
        person.homeworld = {...new Planet(), id: createPersonDto.homeworldId};

        return this.personRepository.save(person);
    }

    async findAll() {
        return this.personRepository.find({
            relations: {
                images: true,
                films: true,
                species: true,
                homeworld: true,
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
                homeworld: true,
            }
        });
    }

    async update(id: number, updatePersonDto: UpdatePersonDto) {
        const person = await this.findOne(id);

        if (!person) throw new NotFoundException('No such user!');

        const updatedPerson = {...person, ...updatePersonDto};

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