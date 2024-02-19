import {IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';
import {PrimaryGeneratedColumn} from 'typeorm';

export class CreateUserDto {
    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    username: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    password: string;
}
