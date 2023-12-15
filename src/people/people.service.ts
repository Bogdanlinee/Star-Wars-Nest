import {BadRequestException, Injectable} from '@nestjs/common';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Person} from './entities/person.entity';
import {Repository} from 'typeorm';
import {NotFoundException} from '@nestjs/common';
import {v2 as cloudinary} from 'cloudinary';
import * as path from 'path';
import {unlink} from 'fs/promises';

cloudinary.config({
    cloud_name: 'dkvxlz5k1',
    api_key: '428367672613777',
    api_secret: 'FWszyKa_aUYifjbY5ZrTkhLk9fU'
});

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>
    ) {
    }

    async create(createPersonDto: CreatePersonDto) {
        return this.personRepository.save(createPersonDto);
    }

    async findAll() {
        return this.personRepository.find();
    }

    async findOne(id: number) {
        const person = await this.personRepository.findOneBy({id});
        return person;
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

        return await this.personRepository.remove(person);
    }

    async addImage(file: Express.Multer.File, id: number) {
        const person = await this.findOne(id);
        const filePath = path.join(process.cwd(), file.path);
        const fileName = file.filename;

        if (!person) {
            try {
                await unlink(filePath);
            } catch (err) {
                console.log(err);
            }
            throw new NotFoundException('No such user!');
        }

        await cloudinary.uploader.upload(filePath,
            {public_id: fileName, folder: 'star-wars'},
            async function (err, result) {
                if (err) {
                    throw new BadRequestException('Something went wrong, please upload file again.');
                }

                try {
                    await unlink(filePath);
                } catch (err) {
                    console.log(err);
                }
            });
    }
}