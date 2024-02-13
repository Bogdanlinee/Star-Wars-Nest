import {Body, Controller, Post, UseGuards, Request, Session, Req} from '@nestjs/common';
import {UsersService} from './users.service';
import {LocalAuthGuard} from '../auth/guards/local-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    // @UseGuards(LocalAuthGuard)
    @Post('signup')
    signup(@Session() session: Record<string, any>) {

        console.log(session);
        console.log(session.id);

        session.auth = true;

        return session;
    }

    @Post('signin')
    signin(@Body() body: any) {
        return 'This is signin route';
    }
}
