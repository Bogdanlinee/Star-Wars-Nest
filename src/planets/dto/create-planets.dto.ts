import {IsArray, IsDateString, IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CreatePlanetsDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    rotation_period: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    orbital_period: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    diameter: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    climate: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    gravity: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    terrain: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    surface_water: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    population: string;

    @IsArray()
    @ApiProperty()
    residentIds: number[];

    @IsArray()
    @ApiProperty()
    speciesIds: number[];

    @IsArray()
    @ApiProperty()
    filmIds: number[];
}
