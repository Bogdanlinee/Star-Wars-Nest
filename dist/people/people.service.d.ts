import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
export declare class PeopleService {
    private personRepository;
    people: Person[];
    constructor(personRepository: Repository<Person>);
    create(createPersonDto: CreatePersonDto): Promise<CreatePersonDto & Person>;
    findOne(id: number): Promise<Person>;
}
