import {Test, TestingModule} from '@nestjs/testing';
import {ImagesService} from './images.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ImagePerson} from './entities/image.person.entity';
import {Repository} from 'typeorm';
import {uploadFileCloudinary} from '../utils/cloudinaryFileUpload';
import {BadRequestException, NotFoundException} from '@nestjs/common';
import {Person} from '../people/entities/person.entity';
import {Planet} from '../planets/entities/planet.entity';

jest.mock('../utils/cloudinaryFileUpload', () => ({
        uploadFileCloudinary: jest.fn(),
    })
);

jest.mock('fs/promises', () => ({
        unlink: jest.fn(),
    })
);

describe('TestUploadImageService', () => {
    let service: ImagesService;
    let imageRepository: Repository<ImagePerson>;
    const images: ImagePerson[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ImagesService,
                {
                    provide: getRepositoryToken(ImagePerson),
                    useClass: Repository,
                }
            ],
        }).compile();

        service = module.get<ImagesService>(ImagesService);
        imageRepository = module.get<Repository<ImagePerson>>(getRepositoryToken(ImagePerson));
    });

    it('Throws Error. Trying to upload the file.', () => {
        const file = {path: 'mocked-path', filename: 'mocked-filename'} as Express.Multer.File;

        (uploadFileCloudinary as jest.Mock).mockResolvedValueOnce(null);
        expect(service.addImage(file, testPersonEntity)).rejects.toThrow(BadRequestException);
    });

    it('Can upload a new image.', async () => {
        const file = {path: 'mocked-path', filename: 'mocked-filename'} as Express.Multer.File;

        jest.spyOn(imageRepository, 'create').mockReturnValue(testImageEntity);
        jest.spyOn(imageRepository, 'save').mockResolvedValue(testImageEntity);
        (uploadFileCloudinary as jest.Mock).mockResolvedValueOnce({url: 'mocked-url', public_id: 'mocked-id'});

        const result = await service.addImage(file, testPersonEntity);

        expect(result).toEqual(testImageEntity);
        images.push({...testImageEntity, person: testPersonEntity});
    });

    it('Throws Error. Trying to delete one image', async () => {
        const imageUrl = 'imageUrl';
        const personId = 10;

        jest.spyOn(imageRepository, 'findOne').mockImplementation(async () => {
            const image = images.find(item => item.image === imageUrl);
            return image ? image : null;
        });

        await expect(service.deleteImage(personId, imageUrl)).rejects.toThrow(NotFoundException);
    });

    it('Can delete one image', async () => {
        const imageUrl = 'imageUrl';
        const personId = 1;

        jest.spyOn(imageRepository, 'save').mockResolvedValue(images[0]);
        jest.spyOn(imageRepository, 'findOne').mockImplementation(async () => {
            const image = images.find(item => item.image === imageUrl);
            return image ? image : null;
        });

        const result = await service.deleteImage(personId, imageUrl);

        expect(result).toEqual(images[0]);
        images.shift();
    });

    const testPersonEntity = {
        name: "Dan Test1",
        height: "199",
        mass: "85",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        homeworld: new Planet(),
        homeworldId: 1,
        films: [],
        species: [],
        created: new Date(),
        edited: new Date(),
        url: "https://swapi.dev/api/people/1/",
        images: [],
        id: 1,
        deletedAt: new Date(),
    };

    const testImageEntity = {
        id: 1,
        person: {} as Person,
        image: 'imageUrl',
        publicId: 'string',
        deletedAt: new Date(),
        createdDate: new Date(),
    };
});
