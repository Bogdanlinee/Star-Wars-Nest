import {IsArray, IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';

export class CreateStarshipsDto {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    name: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    model: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    manufacturer: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    cost_in_credits: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    length: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    max_atmosphering_speed: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    crew: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    passengers: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    cargo_capacity: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    consumables: string;

    @Transform(({value}) => isNaN(parseFloat(value)) ? 'unknown' : parseFloat(value))
    @IsNotEmpty()
    hyperdrive_rating: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    MGLT: string;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    starship_class: string;

    @IsArray()
    pilotsIds: number[];

    @IsArray()
    filmsIds: number[];
}
