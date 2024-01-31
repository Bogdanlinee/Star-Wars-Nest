import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Vehicle} from './entities/vehicle.entity';
import {VehiclesController} from './vehicles.controller';
import {VehiclesService} from './vehicles.service';
import {Film} from '../films/entities/film.entity';
import {Person} from '../people/entities/person.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Vehicle, Film, Person])],
    controllers: [VehiclesController],
    providers: [VehiclesService]
})

export class VehiclesModule {
}
