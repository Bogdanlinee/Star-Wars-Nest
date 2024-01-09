import {Module} from '@nestjs/common';
import {PeopleModule} from './people/people.module';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {dbConfig} from '../ormconfig.js';
import {ImagesModule} from './images/images.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { FilmsModule } from './films/films.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        PeopleModule,
        ImagesModule,
        TypeOrmModule.forRoot(dbConfig as TypeOrmModuleOptions),
        FilmsModule,
    ],
})
export class AppModule {
    constructor(private configService: ConfigService) {
    }
}