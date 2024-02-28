import {
    IsNotEmpty,
} from 'class-validator';
import {Transform} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class ImageDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    image: string;
}
