import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ImagePerson} from './entities/image.person.entity';
import {Person} from '../people/entities/person.entity';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>,
        @InjectRepository(ImagePerson)
        private imagePersonRepository: Repository<ImagePerson>) {
    }

    async findOne(id: number) {
        return await this.personRepository.findOneBy({id});
    }

    async testResponse() {
        return await this.findOne(1);
    }
}
