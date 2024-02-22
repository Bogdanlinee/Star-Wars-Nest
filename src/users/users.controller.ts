import {Controller, Post, UseGuards, Req, Body, UsePipes, ValidationPipe, UseInterceptors} from '@nestjs/common';
import {UsersService} from './users.service';
import {LocalAuthGuard} from '../auth/guards/local-auth.guard';
import {CreateUserDto} from './dto/user.dto';
import {Request} from 'express';
import {UsersSerializeInterceptor} from './interceptors/users.serialize.interceptor';
import {ChangeRoleDto} from './dto/change-role-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('signup')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    @UseInterceptors(UsersSerializeInterceptor)
    signup(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto.username, createUserDto.password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signin(@Req() req: Request) {
        return req.user;
    }

    @Post('role')
    chageRole(@Body() changeRoleDto: ChangeRoleDto) {
        return this.usersService.changeRole(changeRoleDto);
    }
}
