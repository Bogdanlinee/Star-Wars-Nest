import {IsArray, IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CreateStarshipsDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    model: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    manufacturer: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    cost_in_credits: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    length: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    max_atmosphering_speed: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    crew: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    passengers: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    cargo_capacity: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    consumables: string;

    @Transform(({value}) => isNaN(parseFloat(value)) ? 'unknown' : parseFloat(value))
    @IsNotEmpty()
    @ApiProperty()
    hyperdrive_rating: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    @ApiProperty()
    MGLT: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @ApiProperty()
    starship_class: string;

    @IsArray()
    @ApiProperty()
    pilotsIds: number[];

    @IsArray()
    @ApiProperty()
    filmsIds: number[];
}
