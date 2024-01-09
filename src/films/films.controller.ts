import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {FilmsService} from './films.service';
import {CreateFilmDto} from './dto/create-film.dto';

@Controller('films')
export class FilmsController {
    constructor(private readonly peopleService: FilmsService) {
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    async create(@Body() createFilmDto: CreateFilmDto) {
        return await this.peopleService.create(createFilmDto);
    }

    /*
         @Get('/:id')
        async findOne(@Param('id', ParseIntPipe) id: number) {
            const person = await this.peopleService.findOne(id)

            if (!person) throw new NotFoundException('No such user!');

            return person;
        }

        @Get()
        findAll() {
            return this.peopleService.findAll();
        }

        @Patch('/:id')
        @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
        update(@Param('id', ParseIntPipe) id: number, @Body() updatePersonDto: UpdatePersonDto) {
            return this.peopleService.update(id, updatePersonDto);
        }

        @Delete('/:id')
        remove(@Param('id', ParseIntPipe) id: number) {
            return this.peopleService.remove(id);
        }
    */
}
