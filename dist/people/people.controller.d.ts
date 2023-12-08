import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    create(createPersonDto: CreatePersonDto): {
        id: number;
        name: string;
        height: string | number;
        mass: string | number;
        hair_color: string;
        skin_color: string;
        eye_color: string;
        birth_year: string;
        gender: string;
        homeworld: string;
        films: string[];
        species: string[];
        vehicles: string[];
        starships: string[];
        created: string;
        edited: string;
        url: string;
    };
    findAll(): import("./entities/person.entity").Person[];
    findOne(id: number): import("./entities/person.entity").Person;
    update(id: number, updatePersonDto: UpdatePersonDto): {
        name: string;
        height: string | number;
        mass: string | number;
        hair_color: string;
        skin_color: string;
        eye_color: string;
        birth_year: string;
        gender: string;
        homeworld: string;
        films: string[];
        species: string[];
        vehicles: string[];
        starships: string[];
        created: string;
        edited: string;
        url: string;
        id: number;
    };
    remove(id: number): import("./entities/person.entity").Person;
}
