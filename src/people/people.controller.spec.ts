import {Test, TestingModule} from '@nestjs/testing';
import {PeopleController} from './people.controller';
import {PeopleService} from './people.service';
import {Repository} from 'typeorm';
import {ImagePerson} from '../images/entities/image.person.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Person} from './entities/person.entity';
import {NotFoundException} from '@nestjs/common';

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
            ],
        }).compile();

        controller = module.get<PeopleController>(PeopleController);
        personRepository = module.get<Repository<Person>>(getRepositoryToken(Person));
        imageRepository = module.get<Repository<ImagePerson>>(getRepositoryToken(ImagePerson));
    });

    it('Can add one person in DB.', async () => {
        jest.spyOn(controller['peopleService'], 'create').mockResolvedValue(testPersonEntity);
        const result = await controller.create(testPersonEntity);
        people.push(testPersonEntity);
        expect(result).toEqual(testPersonEntity);
    });

    it('Can find one person in DB.', async () => {
        const personId = 1;
        jest.spyOn(controller['peopleService'], 'findOne').mockImplementation(async () => {
            const person = people.find(item => item.id === personId)
            return person ? person : null;
        });
        const result = await controller.findOne(personId);
        expect(result).toEqual(testPersonEntity);
    });

    it('Throws Error. Find person in DB.', async () => {
        const personId = 0;
        jest.spyOn(controller['peopleService'], 'findOne').mockImplementation(async () => {
            const person = people.find(item => item.id === personId)
            return person ? person : null;
        });
        await expect(controller.findOne(personId)).rejects.toThrow(NotFoundException);
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
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [],
        filmIds: [],
        species: [],
        speciesIds: [],
        vehicles: [
            "https://swapi.dev/api/vehicles/14/",
            "https://swapi.dev/api/vehicles/30/"
        ],
        starships: [
            "https://swapi.dev/api/starships/12/",
            "https://swapi.dev/api/starships/22/"
        ],
        created: new Date(),
        edited: new Date(),
        url: "https://swapi.dev/api/people/1/",
        images: [],
        id: 1,
        deletedAt: new Date(),
    };
});
