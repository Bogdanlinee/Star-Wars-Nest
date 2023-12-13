import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
export declare class PeopleService {
    private personRepository;
    constructor(personRepository: Repository<Person>);
    create(createPersonDto: CreatePersonDto): Promise<CreatePersonDto & Person>;
    findAll(): Promise<Person[]>;
    findOne(id: number): Promise<Person>;
    update(id: number, updatePersonDto: UpdatePersonDto): Promise<{
        name: string;
        height: string;
        mass: string;
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
        edited: string | null;
        url: string;
        id: number;
    } & Person>;
    remove(id: number): Promise<Person>;
}
