import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    create(createPersonDto: CreatePersonDto): Promise<CreatePersonDto & import("./entities/person.entity").Person>;
    findOne(id: number): Promise<import("./entities/person.entity").Person>;
    findAll(): Promise<import("./entities/person.entity").Person[]>;
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
    } & import("./entities/person.entity").Person>;
    remove(id: number): Promise<import("./entities/person.entity").Person>;
}
