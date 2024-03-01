import {Controller, Post, UseGuards, Req, Body, UsePipes, ValidationPipe, UseInterceptors} from '@nestjs/common';
import {UsersService} from './users.service';
import {LocalAuthGuard} from '../auth/guards/local-auth.guard';
import {CreateUserDto} from './dto/user.dto';
import {Request} from 'express';
import {UsersSerializeInterceptor} from './interceptors/users.serialize.interceptor';
import {ApiBody, ApiTags} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
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
    @ApiBody({
        type: CreateUserDto,
        examples: {
            a: {
                summary: 'admin role',
                description: 'Login as admin user.',
                value: {
                    username: 'admin@test.test',
                    password: 'testPass',
                },
            },
            b: {
                summary: 'user role',
                description: 'Login as regular user(can not create and delete).',
                value: {
                    username: 'user@test.test',
                    password: 'testPass',
                },
            }
        }
    })
    @Post('signin')
    signin(@Req() req: Request) {
        return req.user;
    }
}
