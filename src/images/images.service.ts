import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ImagePerson} from './entities/image.person.entity';
import * as path from 'path';
import {uploadFileCloudinary, deleteFileCloudinary} from '../utils/cloudinaryFileUpload';
import {UploadApiResponse} from 'cloudinary';
import {unlink} from 'fs/promises';
import {Person} from '../people/entities/person.entity';
import {ConfigService} from '@nestjs/config';
import * as process from 'process';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import * as fs from 'fs';

@Injectable()
export class ImagesService {
    private readonly s3Client = new S3Client([{
        region: process.env.AWS_S3_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }]);

    constructor(
        @InjectRepository(ImagePerson)
        private imagePersonRepository: Repository<ImagePerson>,
        @InjectRepository(Person)
        private peopleRepository: Repository<Person>,
    ) {
    }

    async addImage(file: Express.Multer.File, id: number) {
        const filePath = path.join(process.cwd(), file.path);
        console.log(file);

        const buffer = fs.readFileSync(filePath);

        await this.s3Client.send(new PutObjectCommand({
                Bucket: 'wbb-starwars',
                Key: file.filename,
                Body: buffer,
            })
        )

        return;


        // const person = await this.peopleRepository.findOne({where: {id}});
        // const filePath = path.join(process.cwd(), file.path);
        //
        // if (!person) {
        //     await unlink(filePath);
        //     throw new NotFoundException('No such user!')
        // }
        //
        // const fileName = file.filename;
        // const uploadedFile = await uploadFileCloudinary(filePath, fileName) as UploadApiResponse | null;
        //
        // await unlink(filePath);
        //
        // if (!uploadedFile) throw new BadRequestException('Something went wrong, please upload file again!');
        //
        // const {url: imageUrl, public_id: imagePublicId} = uploadedFile;
        //
        // const image = this.imagePersonRepository.create({image: imageUrl, publicId: imagePublicId});
        //
        // image.person = person;
        //
        // return await this.imagePersonRepository.save(image);
    }

    async deleteImage(id: number, image: string) {
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
