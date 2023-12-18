import {BadRequestException, Injectable} from '@nestjs/common';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Person} from './entities/person.entity';
import {Repository} from 'typeorm';
import {NotFoundException} from '@nestjs/common';
import * as path from 'path';
import {unlink} from 'fs/promises';
import {UploadApiResponse} from 'cloudinary';
import {uploadFileCloudinary} from '../utils/cloudinaryFileUpload';

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
        return await this.personRepository.findOneBy({id});
    }

    async update(id: number, updatePersonDto: UpdatePersonDto) {
        const person = await this.findOne(id);

        if (!person) throw new NotFoundException('No such user!');

        const updatedPerson = {...person, ...updatePersonDto, edited: new Date().toISOString()};

        return await this.personRepository.save(updatedPerson);
    }

    async remove(id: number) {
        const person = await this.findOne(id);

        if (!person) throw new NotFoundException('No such user!');

        return await this.personRepository.remove(person);
    }

    async addImage(file: Express.Multer.File, id: number) {
        const person = await this.findOne(id);

        if (!person) throw new NotFoundException('No such user!');

        const filePath = path.join(process.cwd(), file.path);
        const fileName = file.filename;
        const uploadedFile = await uploadFileCloudinary(filePath, fileName) as UploadApiResponse | null;

        if (!uploadedFile) throw new BadRequestException('Something went wrong, please upload file again!');

        const uploadedFileUrl = uploadedFile.url;

        try {
            await unlink(filePath);
        } catch (err) {
        }

        person.images ? person.images.push(uploadedFileUrl) : person.images = [uploadedFileUrl];

        return await this.update(id, person);
    }

    async deleteImage(id: number, imageUrl: string) {
        const person = await this.findOne(id);

        if (!person) throw new NotFoundException('No such user!');

        if (!person.images) return person;

        // need to fix this not filter but just delete one item.
        person.images = person.images.filter(item => item !== imageUrl);

        return await this.update(id, person);
    }
}