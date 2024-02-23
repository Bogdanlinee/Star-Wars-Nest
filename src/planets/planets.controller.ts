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
import {PlanetsService} from './planets.service';
import {CreatePlanetsDto} from './dto/create-planets.dto';
import {UpdatePlanetsDto} from './dto/update-planets.dto';
import {PlanetsSerializeInterceptor} from './interceptors/planets.serialize.interceptor';
import {AuthenticatedGuard} from '../auth/guards/local-auth.guard';
import {RolesGuard} from '../guards/roles.guard';
import {Roles} from '../decorators/roles.decorator';

@Controller('planets')
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseInterceptors(PlanetsSerializeInterceptor)
export class PlanetsController {
    constructor(private readonly planetsService: PlanetsService) {
    }

    @Post()
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    create(@Body() createPlanetsDto: CreatePlanetsDto) {
        return this.planetsService.create(createPlanetsDto);
    }

    @Get('/:id')
    @Roles(['admin', 'user'])
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const planet = await this.planetsService.findOne(id)

        if (!planet) throw new NotFoundException('No such planet!');

        return planet;
    }

    @Get()
    @Roles(['admin', 'user'])
    findAll() {
        return this.planetsService.findAll();
    }

    @Patch('/:id')
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePlanetsDto: UpdatePlanetsDto) {
        return this.planetsService.update(id, updatePlanetsDto);
    }

    @Delete('/:id')
    @Roles(['admin'])
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.planetsService.remove(id);
    }
}
