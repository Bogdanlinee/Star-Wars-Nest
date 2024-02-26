import {IsArray, IsNotEmpty} from 'class-validator';
import {Transform} from 'class-transformer';

export class CreateVehiclesDto {
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

    @Transform(({value}) => isNaN(parseFloat(value)) ? 'unknown' : parseFloat(value))
    @IsNotEmpty()
    length: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
    @IsNotEmpty()
    max_atmosphering_speed: string;

    @Transform(({value}) => isNaN(parseInt(value)) ? 'unknown' : parseInt(value))
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

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    vehicle_class: string;

    @IsArray()
    pilotsIds: number[];

    @IsArray()
    filmsIds: number[];
}
