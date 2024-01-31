import {Module} from '@nestjs/common';
import {SpeciesController} from './species.controller';
import {SpeciesService} from './species.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Species} from './entities/species.entity';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';
import {Planet} from '../planets/entities/planet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Species, Film, Person, Planet])],
    controllers: [SpeciesController],
    providers: [SpeciesService],
})
export class SpeciesModule {
}
