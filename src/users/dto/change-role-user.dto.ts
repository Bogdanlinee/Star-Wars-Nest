import {Transform} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';

export class ChangeRoleDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    username: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    role: ('admin'|'user');
}