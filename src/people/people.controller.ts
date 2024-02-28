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
    NotFoundException, UseInterceptors, UseGuards,
} from '@nestjs/common';
import {PeopleService} from './people.service';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {PeopleSerializeInterceptor} from './interceptors/people.serialize.interceptor';
import {Roles} from '../decorators/roles.decorator';
import {AuthenticatedGuard} from '../auth/guards/local-auth.guard';
import {RolesGuard} from '../guards/roles.guard';
import {ApiBody, ApiTags} from '@nestjs/swagger';
import mockPeopleDTO from '../mocks/people/mockPeopleDTO';

@Controller('people')
@ApiTags('People')
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseInterceptors(PeopleSerializeInterceptor)
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {
    }

    @Post()
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    @ApiBody({
        type: CreatePersonDto,
        description: 'Admin role required.',
        examples: {
            a: {
                value: mockPeopleDTO,
                summary: 'Person Entity',
            },
        }
    })
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
    @ApiBody({
        type: UpdatePersonDto,
        description: 'Admin role required.',
        examples: {
            a: {
                summary: 'Update Person',
                value: {
                    name: 'New person name'
                }
            },
        }
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePersonDto: UpdatePersonDto) {
        return this.peopleService.update(id, updatePersonDto);
    }

    @Delete('/:id')
    @Roles(['admin'])
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.peopleService.remove(id);
    }
}