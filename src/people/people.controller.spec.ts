import {Test, TestingModule} from '@nestjs/testing';
import {PeopleController} from './people.controller';
import {PeopleService} from './people.service';
import {Repository} from 'typeorm';
import {ImagePerson} from '../images/entities/image.person.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Person} from './entities/person.entity';
import {NotFoundException} from '@nestjs/common';
import {Planet} from '../planets/entities/planet.entity';
import {Species} from '../species/entities/species.entity';
import {Starship} from '../starships/entities/starship.entity';
import {Vehicle} from '../vehicles/entities/vehicle.entity';
import {Film} from '../films/entities/film.entity';
import mockPersonEntity from '../mocks/people/mockPersonEntity';

describe('PeopleController', () => {
    let controller: PeopleController;
    let peopleService: PeopleService;
    let personRepository: Repository<Person>;
    let imageRepository: Repository<ImagePerson>;
    const people: Person[] = [];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PeopleController],
            providers: [
                {
                    provide: PeopleService,
                    useClass: PeopleService
                },
                {
                    provide: getRepositoryToken(ImagePerson),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Person),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Species),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Planet),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Starship),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: () => {
                    },
                },
                {
                    provide: getRepositoryToken(Film),
                    useValue: () => {
                    },
                },
            ],
        }).compile();

        controller = module.get<PeopleController>(PeopleController);
        personRepository = module.get<Repository<Person>>(getRepositoryToken(Person));
        imageRepository = module.get<Repository<ImagePerson>>(getRepositoryToken(ImagePerson));
    });

    it('Can add one person in DB.', async () => {
        jest.spyOn(controller['peopleService'], 'create').mockResolvedValue(mockPersonEntity);
        const result = await controller.create(mockPersonEntity);
        people.push(mockPersonEntity);
        expect(result).toEqual(mockPersonEntity);
    });

    it('Can find one person in DB.', async () => {
        const personId = 1;
        jest.spyOn(controller['peopleService'], 'findOne').mockImplementation(async () => {
            const person = people.find(item => item.id === personId)
            return person ? person : null;
        });
        const result = await controller.findOne(personId);
        expect(result).toEqual(mockPersonEntity);
    });

    it('Throws Error. Find person in DB.', async () => {
        const personId = 0;
        jest.spyOn(controller['peopleService'], 'findOne').mockImplementation(async () => {
            const person = people.find(item => item.id === personId)
            return person ? person : null;
        });
        await expect(controller.findOne(personId)).rejects.toThrow(NotFoundException);
    });
});
