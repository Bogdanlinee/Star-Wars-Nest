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
import {FilmsService} from './films.service';
import {CreateFilmDto} from './dto/create-film.dto';
import {UpdateFilmDto} from './dto/update-film.dto';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    async create(@Body() createFilmDto: CreateFilmDto) {
        return await this.filmsService.create(createFilmDto);
    }

    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const film = await this.filmsService.findOne(id)

        if (!film) throw new NotFoundException('No such film!');

        return film;
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    update(@Param('id', ParseIntPipe) id: number, @Body() updateFilmDto: UpdateFilmDto) {
        return this.filmsService.update(id, updateFilmDto);
    }

    @Get()
    findAll() {
        return this.filmsService.findAll();
    }

    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.filmsService.remove(id);
    }
}
