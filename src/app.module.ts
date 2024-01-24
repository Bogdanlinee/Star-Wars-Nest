import {Module} from '@nestjs/common';
import {PeopleModule} from './people/people.module';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {dbConfig} from '../ormconfig.js';
import {ImagesModule} from './images/images.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { FilmsModule } from './films/films.module';
import { SpeciesModule } from './species/species.module';
import { PlanetsModule } from './planets/planets.module';
import { StarshipsModule } from './starships/starships.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        TypeOrmModule.forRoot(dbConfig as TypeOrmModuleOptions),
        PeopleModule,
        ImagesModule,
        FilmsModule,
        SpeciesModule,
        PlanetsModule,
        StarshipsModule,
    ],
})
export class AppModule {
    constructor(private configService: ConfigService) {
    }
}