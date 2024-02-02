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
import {UpdateSpeciesDto} from './dto/update-species.dto';
import {CreateSpeciesDto} from './dto/create-species.dto';
import {SpeciesService} from './species.service';
import {SpeciesSerializeInterceptor} from './interceptors/species.serialize.interceptor';

@Controller('species')
@UseInterceptors(SpeciesSerializeInterceptor)
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    create(@Body() createSpeciesDto: CreateSpeciesDto) {
        return this.speciesService.create(createSpeciesDto);
    }

    @Get()
    findAll() {
        return this.speciesService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const species = await this.speciesService.findOne(id)

        if (!species) throw new NotFoundException('No such species!');

        return species;
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSpeciesDto: UpdateSpeciesDto) {
        return this.speciesService.update(id, updateSpeciesDto);
    }

    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.speciesService.remove(id);
    }
}
