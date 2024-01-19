import {PartialType} from '@nestjs/mapped-types';
import {CreatePlanetsDto} from './create-planets.dto';

export class UpdatePlanetsDto extends PartialType(CreatePlanetsDto) {
}