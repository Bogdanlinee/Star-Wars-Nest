import {
    Body,
    Controller, Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe, Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {PlanetsService} from './planets.service';
import {CreatePlanetsDto} from './dto/create-planets.dto';
import {UpdatePlanetsDto} from './dto/update-planets.dto';

@Controller('planets')
export class PlanetsController {
    constructor(private readonly planetsService: PlanetsService) {
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    create(@Body() createPlanetsDto: CreatePlanetsDto) {
        return this.planetsService.create(createPlanetsDto);
    }

    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const planet = await this.planetsService.findOne(id)

        if (!planet) throw new NotFoundException('No such planet!');

        return planet;
    }

    @Get()
    findAll() {
        return this.planetsService.findAll();
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePlanetsDto: UpdatePlanetsDto) {
        return this.planetsService.update(id, updatePlanetsDto);
    }

    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.planetsService.remove(id);
    }
}
