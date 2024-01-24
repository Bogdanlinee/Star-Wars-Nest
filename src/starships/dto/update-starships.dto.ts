import {PartialType} from '@nestjs/mapped-types';
import {CreateStarshipsDto} from './create-starships.dto';

export class UpdateStarshipsDto extends PartialType(CreateStarshipsDto) {
}