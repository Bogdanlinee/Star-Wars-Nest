import {Module} from '@nestjs/common';
import {PeopleService} from './people.service';
import {PeopleController} from './people.controller';
import {Person} from './entities/person.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ImagePerson} from '../images/entities/image.person.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Person, ImagePerson])],
    controllers: [PeopleController],
    providers: [PeopleService],
})
export class PeopleModule {
}
