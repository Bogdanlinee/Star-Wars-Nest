import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {ImagesController} from './images.controller';
import {ImagesService} from './images.service';
import {ImagePerson} from './entities/image.person.entity';
import {Person} from '../people/entities/person.entity';
import {PeopleService} from '../people/people.service';
import {Film} from '../films/entities/film.entity';
import {Species} from '../species/entities/species.entity';
import {Planet} from '../planets/entities/planet.entity';
import {Starship} from '../starships/entities/starship.entity';
import {Vehicle} from '../vehicles/entities/vehicle.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ImagePerson, Person, Film, Species, Planet, Starship, Vehicle])],
    controllers: [ImagesController],
    providers: [ImagesService, PeopleService],
})
export class ImagesModule {
}