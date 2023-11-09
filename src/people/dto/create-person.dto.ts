import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePersonDto {
  @IsNumberString()
  id: number;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) =>
    isNaN(parseInt(value)) ? 'unknown' : parseInt(value),
  )
  @IsNotEmpty()
  height: number | string;

  @Transform(({ value }) =>
    isNaN(parseInt(value)) ? 'unknown' : parseInt(value),
  )
  @IsNotEmpty()
  mass: number | string;

  @Transform(({ value }) => (value.trim() ? value.trim() : 'n/a'))
  @IsNotEmpty()
  hair_color: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  skin_color: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  eye_color: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  birth_year: string;

  @Transform(({ value }) => (value.trim() ? value.trim() : 'n/a'))
  @IsNotEmpty()
  gender: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  homeworld: string;

  @IsArray()
  films: string[];

  @IsArray()
  species: string[];

  @IsArray()
  vehicles: string[];

  @IsArray()
  starships: string[];

  @Transform(({ value }) => value.trim())
  @IsDateString()
  created: string;

  @IsDateString()
  @Transform(({ value }) => value.trim())
  edited: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  url: string;
}
