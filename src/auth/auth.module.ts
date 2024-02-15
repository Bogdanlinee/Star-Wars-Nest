import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {LocalStrategy} from './utils/local.strategy';
import {SessionSerializer} from './utils/SessionSerializer';
import {UsersService} from '../users/users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/entities/user.entity';

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([User])],
    providers: [
        AuthService,
        LocalStrategy,
        SessionSerializer,
        {
            provide: 'USER_SERVICE',
            useClass: UsersService
        }
    ],
    exports: [AuthService],
})
export class AuthModule {
}