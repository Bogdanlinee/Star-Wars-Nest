import {
    IsNotEmpty,
} from 'class-validator';
import {Transform} from 'class-transformer';

export class ImageDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    image: string;
}
