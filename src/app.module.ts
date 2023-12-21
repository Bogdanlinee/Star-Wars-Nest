import {Module} from '@nestjs/common';
import {PeopleModule} from './people/people.module';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {dbConfig} from '../ormconfig.js';
import {ImagesModule} from './images/images.module';

@Module({
    imports: [
        PeopleModule,
        ImagesModule,
        TypeOrmModule.forRoot(dbConfig as TypeOrmModuleOptions),
    ],
})
export class AppModule {
}
