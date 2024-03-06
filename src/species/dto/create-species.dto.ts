import {IsArray, IsNotEmpty, IsNumber} from 'class-validator';
import {Transform} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CreateSpeciesDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    classification: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    designation: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    average_height: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    skin_colors: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    hair_colors: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    eye_colors: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    average_lifespan: string;

    @IsNumber()
    @ApiProperty()
    homeworldId: number;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    language: string;

    @IsArray()
    @ApiProperty()
    filmIds: number[];

    @IsArray()
    @ApiProperty()
    peopleIds: number[];

    @IsArray()
    @ApiProperty()
    planetsIds: number[];
}
