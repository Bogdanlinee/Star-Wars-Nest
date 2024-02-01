import {Module} from '@nestjs/common';
import {PeopleService} from './people.service';
import {PeopleController} from './people.controller';
import {Person} from './entities/person.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ImagePerson} from '../images/entities/image.person.entity';
import {Film} from '../films/entities/film.entity';
import {Species} from '../species/entities/species.entity';
import {Planet} from '../planets/entities/planet.entity';
import {Starship} from '../starships/entities/starship.entity';
import {Vehicle} from '../vehicles/entities/vehicle.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Person,
        ImagePerson,
        Film,
        Species,
        Planet,
        Starship,
        Vehicle,
    ])],
    controllers: [PeopleController],
    providers: [PeopleService],
})
export class PeopleModule {
}
