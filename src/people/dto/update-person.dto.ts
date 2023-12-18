import {PartialType} from '@nestjs/mapped-types';
import {CreatePersonDto} from './create-person.dto';
import {Transform} from 'class-transformer';
import {IsDateString} from 'class-validator';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
}
