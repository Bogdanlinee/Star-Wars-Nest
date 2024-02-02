import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    ValidationPipe,
    UsePipes,
    NotFoundException, UseInterceptors,
} from '@nestjs/common';
import {PeopleService} from './people.service';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {PeopleSerializeInterceptor} from './interceptors/people.serialize.interceptor';

@Controller('people')
@UseInterceptors(PeopleSerializeInterceptor)
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    create(@Body() createPersonDto: CreatePersonDto) {
        return this.peopleService.create(createPersonDto);
    }

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
}