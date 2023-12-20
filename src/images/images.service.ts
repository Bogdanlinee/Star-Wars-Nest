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
        console.log(imageUrl, imagePublicId)

        await unlink(filePath);

        const image = this.imagePersonRepository.create({image: imageUrl, publicId: imagePublicId});

        image.person = person;

        return await this.imagePersonRepository.save(image);
    }

    async deleteImage(image: string) {
        const searchedImage = await this.imagePersonRepository.findOneBy({image});

        if (!searchedImage) throw new NotFoundException('No such image');

        await deleteFileCloudinary(searchedImage.publicId);

        return await this.imagePersonRepository.remove(searchedImage);
    }
}
