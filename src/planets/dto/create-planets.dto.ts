import {IsArray, IsDateString, IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';

export class CreatePlanetsDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    name: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    rotation_period: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    orbital_period: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    diameter: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    climate: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    gravity: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    terrain: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    surface_water: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    population: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    url: string;

    @IsArray()
    residentIds: number[];

    @IsArray()
    speciesIds: number[];

    @IsArray()
    filmIds: number[];
}
