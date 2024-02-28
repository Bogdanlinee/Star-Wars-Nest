import {IsArray, IsDateString, IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CreateFilmDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @ApiProperty()
    episode_id: number;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    opening_crawl: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    director: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    producer: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    @IsDateString()
    release_date: string;

    @IsArray()
    @ApiProperty()
    personIds: number[];

    @IsArray()
    @ApiProperty()
    speciesIds: number[];

    @IsArray()
    @ApiProperty()
    planetIds: number[];

    @IsArray()
    @ApiProperty()
    starshipIds: number[];

    @IsArray()
    @ApiProperty()
    vehicleIds: number[];
}
