import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Film} from './entities/film.entity';
import {FilmsController} from './films.controller';
import {FilmsService} from './films.service';
import {Person} from '../people/entities/person.entity';
import {Species} from '../species/entities/species.entity';
import {Planet} from '../planets/entities/planet.entity';
import {Starship} from '../starships/entities/starship.entity';
import {Vehicle} from '../vehicles/entities/vehicle.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Film, Person, Species, Planet, Starship, Vehicle,])],
    controllers: [FilmsController],
    providers: [FilmsService],
})
export class FilmsModule {
}



