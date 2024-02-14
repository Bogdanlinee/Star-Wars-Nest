import {PassportSerializer} from '@nestjs/passport';
import {User, UsersService} from '../../users/users.service';
import {Inject} from '@nestjs/common';

export class SessionSerializer extends PassportSerializer {
    constructor(@Inject('USER_SERVICE') private userService: UsersService) {
        super();
    }

    serializeUser(user: User, done: (err: Error | null, user: User) => void) {
        done(null, user);
    }

    async deserializeUser(user: User, done: (err: Error | null, user: User) => void) {
        const userDB = await this.userService.findOne(user.username);
        return userDB ? done(null, userDB) : done(null, null);
    }
}