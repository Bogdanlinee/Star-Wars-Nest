import {PartialType} from '@nestjs/mapped-types';
import {CreateVehiclesDto} from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(CreateVehiclesDto) {
}