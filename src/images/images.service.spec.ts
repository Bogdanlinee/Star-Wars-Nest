import {Test, TestingModule} from '@nestjs/testing';
import {ImagesService} from './images.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ImagePerson} from './entities/image.person.entity';
import {Repository} from 'typeorm';
import {NotFoundException} from '@nestjs/common';
import {Person} from '../people/entities/person.entity';
import mockPersonEntity from '../mocks/people/mockPersonEntity';
import mockImagesEntity from '../mocks/images/mockImagesEntity';

jest.mock('@aws-sdk/lib-storage', () => {
    return {
        Upload: jest.fn().mockImplementation(() => {
            return {
                done: () => ({Location: 'imageUrl'})
            }
        })
    }
});

jest.mock('fs/promises', () => ({
        unlink: jest.fn(),
        readFile: jest.fn(),
    })
);

describe('TestUploadImageService', () => {
    let service: ImagesService;
    let imageRepository: Repository<ImagePerson>;
    let peopleRepository: Repository<Person>;
    const images: ImagePerson[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ImagesService,
                {
                    provide: getRepositoryToken(ImagePerson),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Person),
                    useClass: Repository,
                }
            ],
        }).compile();

        service = module.get<ImagesService>(ImagesService);
        imageRepository = module.get<Repository<ImagePerson>>(getRepositoryToken(ImagePerson));
        peopleRepository = module.get<Repository<Person>>(getRepositoryToken(Person));
    });

    it('Throws Error. Trying to upload the file.', () => {
        const file = {path: 'mocked-path', filename: 'mocked-filename'} as Express.Multer.File;

        jest.spyOn(peopleRepository, 'findOne').mockResolvedValue(null);

        expect(service.addImage(file, 900)).rejects.toThrow(NotFoundException);
    });

    it('Can upload a new image.', async () => {
        const file = {path: 'mocked-path', filename: 'mocked-filename'} as Express.Multer.File;

        jest.spyOn(imageRepository, 'create').mockReturnValue(mockImagesEntity);
        jest.spyOn(imageRepository, 'save').mockResolvedValue(mockImagesEntity);
        jest.spyOn(peopleRepository, 'findOne').mockResolvedValue(mockPersonEntity);

        const result = await service.addImage(file, 1);

        expect(result).toEqual(mockImagesEntity);
        images.push({...mockImagesEntity, person: mockPersonEntity});
    });

    it('Throws Error. Trying to delete one image', async () => {
        const imageUrl = 'imageUrl';
        const personId = 10;

        jest.spyOn(peopleRepository, 'findOne').mockResolvedValue(mockPersonEntity);
        jest.spyOn(imageRepository, 'findOne').mockImplementation(async () => {
            const image = images.find(item => item.image === imageUrl);
            return image ? image : null;
        });

        await expect(service.deleteImage(personId, imageUrl)).rejects.toThrow(NotFoundException);
    });

    it('Can delete one image', async () => {
        const imageUrl = 'imageUrl';
        const personId = 1;

        jest.spyOn(peopleRepository, 'findOne').mockResolvedValue(mockPersonEntity);
        jest.spyOn(imageRepository, 'save').mockResolvedValue(images[0]);
        jest.spyOn(imageRepository, 'findOne').mockImplementation(async () => {
            const image = images.find(item => item.image === imageUrl);
            return image ? image : null;
        });

        const result = await service.deleteImage(personId, imageUrl);

        expect(result).toEqual(images[0]);

        images.shift();
    });
});
