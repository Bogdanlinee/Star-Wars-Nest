import {Test, TestingModule} from '@nestjs/testing';
import {PeopleService} from './people.service';
import {Repository} from 'typeorm';
import {Person} from './entities/person.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ImagePerson} from '../images/entities/image.person.entity';
import {NotFoundException} from '@nestjs/common';
import {Planet} from '../planets/entities/planet.entity';
import {Species} from '../species/entities/species.entity';
import {Starship} from '../starships/entities/starship.entity';
import {Vehicle} from '../vehicles/entities/vehicle.entity';
import {Film} from '../films/entities/film.entity';
import mockPersonEntity from '../mocks/people/mockPersonEntity';
import mockPeopleDTO from '../mocks/people/mockPeopleDTO';

describe('UserService', () => {
    let peopleService: PeopleService;
    let personRepository: Repository<Person>;
    let imageRepository: Repository<ImagePerson>;
    let planetsRepository: Repository<Planet>;
    const people: Person[] = [];

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PeopleService,
                {
                    provide: getRepositoryToken(Person),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(ImagePerson),
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

        peopleService = module.get<PeopleService>(PeopleService);
        personRepository = module.get<Repository<Person>>(getRepositoryToken(Person));
        imageRepository = module.get<Repository<ImagePerson>>(getRepositoryToken(ImagePerson));
        planetsRepository = module.get<Repository<Planet>>(getRepositoryToken(Planet));
    });

    it('Can add a new person to DB', async () => {
        jest.spyOn(personRepository, 'save').mockResolvedValue(mockPersonEntity);
        jest.spyOn(personRepository, 'create').mockReturnValue(mockPersonEntity);
        jest.spyOn(planetsRepository, 'findOne').mockReturnValue(Promise.resolve(null));

        const result = await peopleService.create(mockPersonEntity);

        people.push(result);

        expect(result).toEqual(mockPersonEntity);
    });

    it('Can find one person in DB', async () => {
        const personId = 1;

        jest.spyOn(personRepository, 'findOne').mockImplementation(async () => {
            const person = people.find(item => item.id === personId)
            return person ? person : null;
        });

        const result = await peopleService.findOne(personId);

        expect(result).toEqual(people[0]);
    });

    it('Throws Error. Find person in DB to remove it', async () => {
        const personId = 10;

        jest.spyOn(personRepository, 'findOne').mockImplementation(async () => {
            const person = people.find(item => item.id === personId)
            return person ? person : null;
        });
        jest.spyOn(personRepository, 'save').mockResolvedValue(mockPersonEntity);

        await expect(peopleService.remove(personId)).rejects.toThrow(NotFoundException);
    });

    it('Can find person in DB to remove it', async () => {
        const personId = 1;
        const personToDelete = {
            ...mockPersonEntity,
            deletedAt: new Date(),
        };

        jest.spyOn(personRepository, 'save').mockResolvedValue(personToDelete);
        jest.spyOn(personRepository, 'create').mockReturnValue(personToDelete);
        jest.spyOn(personRepository, 'findOne').mockImplementation(async () => {
            const person = people.find(item => item.id === personId)
            return person ? person : null;
        });

        const result = await peopleService.remove(personId);

        expect(result).toBeDefined();
    });
});