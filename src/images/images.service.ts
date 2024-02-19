import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ImagePerson} from './entities/image.person.entity';
import {Person} from '../people/entities/person.entity';
import {S3Client} from '@aws-sdk/client-s3';
import {Upload} from '@aws-sdk/lib-storage';
import * as path from 'path';
import * as process from 'process';
import {unlink, readFile} from 'fs/promises';

@Injectable()
export class ImagesService {
    private readonly s3Client = new S3Client({
        region: process.env.AWS_S3_REGION,
    });

    constructor(
        @InjectRepository(ImagePerson)
        private imagePersonRepository: Repository<ImagePerson>,
        @InjectRepository(Person)
        private peopleRepository: Repository<Person>,
    ) {
    }


    async addImage(file: Express.Multer.File, id: number) {
        const person = await this.peopleRepository.findOne({where: {id}});
        const filePath = path.join(process.cwd(), file.path);

        if (!person) {
            await unlink(filePath);
            throw new NotFoundException('No such user!')
        }

        const fileBuffer = await readFile(filePath);

        await unlink(filePath);

        const upload = new Upload({
            client: this.s3Client,
            params: {
                Bucket: 'wbb-starwars',
                Key: file.filename,
                Body: fileBuffer,
                ContentType: file.mimetype,
            },
        });

        const {Location: uploadedImgUrl, Key: objectKey} = await upload.done();
        const image = this.imagePersonRepository.create({image: uploadedImgUrl});

        image.person = person;

        return await this.imagePersonRepository.save(image);
    }

    async deleteImage(id: number, image: string) {
        // Add this to cron later
        // const deleteCommand = await this.s3Client.send(new DeleteObjectCommand({
        //     Bucket: 'wbb-starwars',
        //     Key: objectKey,
        // }))

        const person = await this.peopleRepository.findOne({where: {id}});

        if (!person) throw new NotFoundException('No such user!');

        const searchedImage = await this.imagePersonRepository.findOne({
            where: {image},
            relations: ['person'],
            relationLoadStrategy: 'query',
        });

        const relatedPersonId = searchedImage?.person.id;

        if (!searchedImage || relatedPersonId !== id) throw new NotFoundException('No such image');

        searchedImage.deletedAt = new Date();

        return await this.imagePersonRepository.save(searchedImage);
    }
}
