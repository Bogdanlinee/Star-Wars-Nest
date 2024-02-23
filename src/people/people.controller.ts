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
    NotFoundException, UseInterceptors, UseFilters, ForbiddenException, UseGuards,
} from '@nestjs/common';
import {PeopleService} from './people.service';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {PeopleSerializeInterceptor} from './interceptors/people.serialize.interceptor';
import {Roles} from '../decorators/roles.decorator';
import {AuthenticatedGuard} from '../auth/guards/local-auth.guard';
import {RolesGuard} from '../guards/roles.guard';

@Controller('people')
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseInterceptors(PeopleSerializeInterceptor)
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {
    }

    @Post()
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    create(@Body() createPersonDto: CreatePersonDto) {
        return this.peopleService.create(createPersonDto);
    }

    @Get('/:id')
    @Roles(['admin', 'user'])
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const person = await this.peopleService.findOne(id)

        if (!person) throw new NotFoundException('No such user!');

        return person;
    }

    @Get()
    @Roles(['admin', 'user'])
    findAll() {
        return this.peopleService.findAll();
    }

    @Patch('/:id')
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePersonDto: UpdatePersonDto) {
        return this.peopleService.update(id, updatePersonDto);
    }

    @Delete('/:id')
    @Roles(['admin'])
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.peopleService.remove(id);
    }
}