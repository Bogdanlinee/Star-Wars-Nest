import {IsArray, IsDateString, IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';

export class CreateFilmDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    title: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    episode_id: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    opening_crawl: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    director: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    producer: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @IsDateString()
    release_date: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    url: string;

    @IsArray()
    personIds: number[];
}
