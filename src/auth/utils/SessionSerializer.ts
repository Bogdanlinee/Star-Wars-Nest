import {PassportSerializer} from '@nestjs/passport';
import {UsersService} from '../../users/users.service';
import {Inject} from '@nestjs/common';
import {User} from '../../users/entities/user.entity';

export class SessionSerializer extends PassportSerializer {
    constructor(@Inject('USER_SERVICE') private userService: UsersService) {
        super();
    }

    serializeUser(user: User, done: (err: Error | null, user: User) => void) {
        done(null, user);
    }

    async deserializeUser(user: User, done: (err: Error | null, user: User | null) => void) {
        const userDB = await this.userService.findOne(user.username);
        return userDB ? done(null, userDB) : done(null, null);
    }
}