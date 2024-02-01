import {Module} from '@nestjs/common';
import {StarshipsService} from './starships.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Starship} from './entities/starship.entity';
import {StarshipsController} from './starships.controller';
import {Person} from '../people/entities/person.entity';
import {Film} from '../films/entities/film.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Starship, Film, Person])],
    controllers: [StarshipsController],
    providers: [StarshipsService]
})
export class StarshipsModule {
}
