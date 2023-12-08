import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
export declare class PeopleService {
    people: Person[];
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
    findAll(): Person[];
    findOne(id: number): Person;
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
    remove(id: number): Person;
}
