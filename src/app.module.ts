import {MiddlewareConsumer, Module} from '@nestjs/common';
import {PeopleModule} from './people/people.module';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {dbConfig} from '../ormconfig.js';
import {ImagesModule} from './images/images.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {FilmsModule} from './films/films.module';
import {SpeciesModule} from './species/species.module';
import {PlanetsModule} from './planets/planets.module';
import {StarshipsModule} from './starships/starships.module';
import {VehiclesModule} from './vehicles/vehicles.module';
import {APP_FILTER} from '@nestjs/core';
import {AllExceptionsFilter} from './exceptions/http-exception.filter';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {PassportModule} from '@nestjs/passport';
import * as session from 'express-session';
import * as passport from 'passport';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        PassportModule.register({
            session: true
        }),
        TypeOrmModule.forRoot(dbConfig as TypeOrmModuleOptions),
        PeopleModule,
        ImagesModule,
        FilmsModule,
        SpeciesModule,
        PlanetsModule,
        StarshipsModule,
        VehiclesModule,
        AuthModule,
        UsersModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})


export class AppModule {
    constructor(private configService: ConfigService) {
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(
            session({
                secret: `${process.env.COOKIE_KEY}`,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 60000,
                }
            }),
            passport.initialize(),
            passport.session(),
        ).forRoutes('*')
    }
}