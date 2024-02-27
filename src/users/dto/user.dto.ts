import {IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @Transform(({value}) => value.trim())
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @Transform(({value}) => value.trim())
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
