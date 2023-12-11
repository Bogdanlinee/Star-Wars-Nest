import {Module} from '@nestjs/common';
import {PeopleModule} from './people/people.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Person} from './people/entities/person.entity';

@Module({
    imports: [
        PeopleModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'Test1',
            entities: [Person],
            synchronize: true,
        }),
    ],
})
export class AppModule {
}
