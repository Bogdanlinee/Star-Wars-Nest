import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ImagePerson} from './entities/image.person.entity';
import * as path from 'path';
import {uploadFileCloudinary, deleteFileCloudinary} from '../utils/cloudinaryFileUpload';
import {UploadApiResponse} from 'cloudinary';
import {unlink} from 'fs/promises';
import {Person} from '../people/entities/person.entity';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(ImagePerson)
        private imagePersonRepository: Repository<ImagePerson>) {
    }

    async addImage(file: Express.Multer.File, person: Person) {
        const filePath = path.join(process.cwd(), file.path);
        const fileName = file.filename;
        const uploadedFile = await uploadFileCloudinary(filePath, fileName) as UploadApiResponse | null;

        if (!uploadedFile) throw new BadRequestException('Something went wrong, please upload file again!');

        const {url: imageUrl, public_id: imagePublicId} = uploadedFile;

        await unlink(filePath);

        const image = this.imagePersonRepository.create({image: imageUrl, publicId: imagePublicId});

        image.person = person;

        return await this.imagePersonRepository.save(image);
    }

    async deleteImage(id: number, image: string) {
        const searchedImage = await this.imagePersonRepository.findOne({
            where: {image},
            relations: ['person'],
            relationLoadStrategy: 'query',
        });
        const relatedPersonId = searchedImage?.person.id;

        if (!searchedImage || relatedPersonId !== id) {
            throw new NotFoundException('No such image');
        }

        searchedImage.deletedAt = new Date();

        return await this.imagePersonRepository.save(searchedImage);

        // delete it in corn
        // await deleteFileCloudinary(searchedImage.publicId);
    }
}
