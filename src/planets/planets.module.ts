import {Module} from '@nestjs/common';
import {PlanetsController} from './planets.controller';
import {PlanetsService} from './planets.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Planet} from './entities/planet.entity';
import {Person} from '../people/entities/person.entity';
import {Film} from '../films/entities/film.entity';
import {Species} from '../species/entities/species.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Planet, Person, Film, Species,])],
    controllers: [PlanetsController],
    providers: [PlanetsService]
})
export class PlanetsModule {
}
