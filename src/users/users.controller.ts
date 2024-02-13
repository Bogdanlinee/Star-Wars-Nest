import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {UsersService} from './users.service';
import {LocalAuthGuard} from '../auth/guards/local-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('signup')
    signup(@Request() req: Request) {
        // @ts-ignore
        return req.user;
    }

    @Post('signin')
    signin(@Body() body: any) {
        return 'This is signin route';
    }
}
