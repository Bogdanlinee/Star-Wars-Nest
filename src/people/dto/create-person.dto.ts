import {
    IsArray,
    IsNotEmpty, IsNumber,
} from 'class-validator';
import {Transform} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CreatePersonDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    height: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    mass: string;

    @Transform(({value}) => (value.trim() ? value.trim() : 'n/a'))
    @IsNotEmpty()
    @ApiProperty()
    hair_color: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    skin_color: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    eye_color: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    birth_year: string;

    @Transform(({value}) => (value.trim() ? value.trim() : 'n/a'))
    @IsNotEmpty()
    @ApiProperty()
    gender: string;

    @IsArray()
    @ApiProperty()
    filmIds: number[];

    @IsArray()
    @ApiProperty()
    speciesIds: number[];

    @IsArray()
    @ApiProperty()
    starshipIds: number[];

    @IsArray()
    @ApiProperty()
    vehicleIds: number[];

    @IsNumber()
    @ApiProperty()
    homeworldId: number;
}
