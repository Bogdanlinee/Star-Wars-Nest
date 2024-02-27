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
import {UpdateSpeciesDto} from './dto/update-species.dto';
import {CreateSpeciesDto} from './dto/create-species.dto';
import {SpeciesService} from './species.service';
import {SpeciesSerializeInterceptor} from './interceptors/species.serialize.interceptor';
import {AuthenticatedGuard} from '../auth/guards/local-auth.guard';
import {RolesGuard} from '../guards/roles.guard';
import {Roles} from '../decorators/roles.decorator';
import {ApiTags} from '@nestjs/swagger';

@Controller('species')
@ApiTags('Species')
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseInterceptors(SpeciesSerializeInterceptor)
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {
    }

    @Post()
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    create(@Body() createSpeciesDto: CreateSpeciesDto) {
        return this.speciesService.create(createSpeciesDto);
    }

    @Get()
    @Roles(['admin', 'user'])
    findAll() {
        return this.speciesService.findAll();
    }

    @Get('/:id')
    @Roles(['admin', 'user'])
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const species = await this.speciesService.findOne(id)

        if (!species) throw new NotFoundException('No such species!');

        return species;
    }

    @Patch('/:id')
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSpeciesDto: UpdateSpeciesDto) {
        return this.speciesService.update(id, updateSpeciesDto);
    }

    @Delete('/:id')
    @Roles(['admin'])
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.speciesService.remove(id);
    }
}
