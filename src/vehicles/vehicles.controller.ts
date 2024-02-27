import {
    Body,
    Controller, Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe, Patch,
    Post, UseGuards, UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {VehiclesService} from './vehicles.service';
import {UpdateVehicleDto} from './dto/update-vehicle.dto';
import {CreateVehiclesDto} from './dto/create-vehicle.dto';
import {VehiclesSerializeInterceptor} from './interceptors/vehicles.serialize.interceptor';
import {AuthenticatedGuard} from '../auth/guards/local-auth.guard';
import {RolesGuard} from '../guards/roles.guard';
import {Roles} from '../decorators/roles.decorator';
import {ApiTags} from '@nestjs/swagger';

@Controller('vehicles')
@ApiTags('Vehicles')
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseInterceptors(VehiclesSerializeInterceptor)
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) {
    }

    @Post()
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    create(@Body() createVehiclesDto: CreateVehiclesDto) {
        return this.vehiclesService.create(createVehiclesDto);
    }

    @Get()
    @Roles(['admin', 'user'])
    findAll() {
        return this.vehiclesService.findAll();
    }

    @Get('/:id')
    @Roles(['admin', 'user'])
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const vehicle = await this.vehiclesService.findOne(id)

        if (!vehicle) throw new NotFoundException('No such vehicle!');

        return vehicle;
    }

    @Patch('/:id')
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    update(@Param('id', ParseIntPipe) id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
        return this.vehiclesService.update(id, updateVehicleDto);
    }

    @Delete('/:id')
    @Roles(['admin'])
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.vehiclesService.remove(id);
    }
}
