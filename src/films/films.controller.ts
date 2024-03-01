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
import {FilmsService} from './films.service';
import {CreateFilmDto} from './dto/create-film.dto';
import {UpdateFilmDto} from './dto/update-film.dto';
import {FilmsSerializeInterceptor} from './interceptors/films.serialize.interceptor';
import {AuthenticatedGuard} from '../auth/guards/local-auth.guard';
import {RolesGuard} from '../guards/roles.guard';
import {Roles} from '../decorators/roles.decorator';
import {ApiBody, ApiTags} from '@nestjs/swagger';
import mockFilmsDTO from '../mocks/films/mockFilmsDTO';

@Controller('films')
@ApiTags('Films')
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseInterceptors(FilmsSerializeInterceptor)
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {
    }

    @Post()
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    @ApiBody({
        type: CreateFilmDto,
        description: 'Admin role required.',
        examples: {
            a: {
                value: mockFilmsDTO,
                summary: 'Film Entity',
            },
        }
    })
    async create(@Body() createFilmDto: CreateFilmDto) {
        return await this.filmsService.create(createFilmDto);
    }

    @Get('/:id')
    @Roles(['admin', 'user'])
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const film = await this.filmsService.findOne(id)

        if (!film) throw new NotFoundException('No such film!');

        return film;
    }

    @Patch('/:id')
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    @ApiBody({
        type: UpdateFilmDto,
        description: 'Admin role required.',
        examples: {
            a: {
                value: {
                    title: 'new film title'
                },
                summary: 'Update Film',
            },
        }
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateFilmDto: UpdateFilmDto) {
        return this.filmsService.update(id, updateFilmDto);
    }

    @Get()
    @Roles(['admin', 'user'])
    findAll() {
        return this.filmsService.findAll();
    }

    @Delete('/:id')
    @Roles(['admin'])
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.filmsService.remove(id);
    }
}
