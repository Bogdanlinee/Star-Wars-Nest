import {IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';

export class CreateUserDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    username: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    password: string;
}
