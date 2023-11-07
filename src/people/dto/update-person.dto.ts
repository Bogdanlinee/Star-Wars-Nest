import {PartialType} from '@nestjs/mapped-types';
import {CreatePersonDto} from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
    id: number;
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}
