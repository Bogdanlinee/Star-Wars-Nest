import {Controller, Post, UseGuards, Req, Body} from '@nestjs/common';
import {UsersService} from './users.service';
import {LocalAuthGuard} from '../auth/guards/local-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('signup')
    signup(@Req() req: any) {
        return req.user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signin(@Body() body: any) {
        return this.usersService.create(body.username, body.password);
    }
}
