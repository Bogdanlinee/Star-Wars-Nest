import {IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';

export class CreateSpeciesDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    name: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    classification: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    designation: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    average_height: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    skin_colors: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    hair_colors: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    eye_colors: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    average_lifespan: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    homeworld: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    language: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    url: string;
}
