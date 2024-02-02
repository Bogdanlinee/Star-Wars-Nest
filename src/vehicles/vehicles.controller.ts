import {
    Body,
    Controller, Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe, Patch,
    Post, UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {VehiclesService} from './vehicles.service';
import {UpdateVehicleDto} from './dto/update-vehicle.dto';
import {CreateVehiclesDto} from './dto/create-vehicle.dto';
import {VehiclesSerializeInterceptor} from './interceptors/vehicles.serialize.interceptor';

@Controller('vehicles')
@UseInterceptors(VehiclesSerializeInterceptor)
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) {
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    create(@Body() createVehiclesDto: CreateVehiclesDto) {
        return this.vehiclesService.create(createVehiclesDto);
    }

    @Get()
    findAll() {
        return this.vehiclesService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const vehicle = await this.vehiclesService.findOne(id)

        if (!vehicle) throw new NotFoundException('No such vehicle!');

        return vehicle;
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    update(@Param('id', ParseIntPipe) id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
        return this.vehiclesService.update(id, updateVehicleDto);
    }

    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.vehiclesService.remove(id);
    }
}
