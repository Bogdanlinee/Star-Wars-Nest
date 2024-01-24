import {
    IsArray,
    IsNotEmpty, IsNumber,
} from 'class-validator';
import {Transform} from 'class-transformer';

export class CreatePersonDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    name: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    height: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    mass: string;

    @Transform(({value}) => (value.trim() ? value.trim() : 'n/a'))
    @IsNotEmpty()
    hair_color: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    skin_color: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    eye_color: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    birth_year: string;

    @Transform(({value}) => (value.trim() ? value.trim() : 'n/a'))
    @IsNotEmpty()
    gender: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    url: string;

    @IsArray()
    filmIds: number[];

    @IsArray()
    speciesIds: number[];

    @IsArray()
    starshipIds: number[];

    @IsNumber()
    homeworldId: number;
}
