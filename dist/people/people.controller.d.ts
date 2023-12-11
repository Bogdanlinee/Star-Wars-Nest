import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    create(createPersonDto: CreatePersonDto): Promise<CreatePersonDto & import("./entities/person.entity").Person>;
    findOne(id: number): Promise<import("./entities/person.entity").Person>;
}
