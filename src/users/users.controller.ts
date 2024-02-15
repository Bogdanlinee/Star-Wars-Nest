import {Controller, Post, UseGuards, Req, Body, UsePipes, ValidationPipe} from '@nestjs/common';
import {UsersService} from './users.service';
import {LocalAuthGuard} from '../auth/guards/local-auth.guard';
import {CreateUserDto} from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('signup')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    signup(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto.username, createUserDto.password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signin(@Req() req: any) {
        return req.user;
    }
}
