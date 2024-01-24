import {Test, TestingModule} from '@nestjs/testing';
import {PeopleService} from './people.service';
import {Repository} from 'typeorm';
import {Person} from './entities/person.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ImagePerson} from '../images/entities/image.person.entity';
import {NotFoundException} from '@nestjs/common';
import {Planet} from '../planets/entities/planet.entity';

describe('UserService', () => {
    let peopleService: PeopleService;
    let personRepository: Repository<Person>;
    let imageRepository: Repository<ImagePerson>;
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
            ],
        }).compile();

        peopleService = module.get<PeopleService>(PeopleService);
        personRepository = module.get<Repository<Person>>(getRepositoryToken(Person));
        imageRepository = module.get<Repository<ImagePerson>>(getRepositoryToken(ImagePerson));
    });

    it('Can add a new person to DB', async () => {
        jest.spyOn(personRepository, 'save').mockResolvedValue(testPersonEntity);
        jest.spyOn(personRepository, 'create').mockReturnValue(testPersonEntity);

        const result = await peopleService.create(testPersonEntity);

        people.push(result);

        expect(result).toEqual(testPersonEntity);
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
        jest.spyOn(personRepository, 'save').mockResolvedValue(testPersonEntity);

        await expect(peopleService.remove(personId)).rejects.toThrow(NotFoundException);
    });

    it('Can find person in DB to remove it', async () => {
        const personId = 1;
        const personToDelete = {
            ...testPersonEntity,
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
        starships: [],
        filmIds: [],
        species: [],
        speciesIds: [],
        starshipIds: [],
        created: new Date(),
        edited: new Date(),
        url: "https://swapi.dev/api/people/1/",
        images: [],
        id: 1,
        deletedAt: new Date(),
    };
});