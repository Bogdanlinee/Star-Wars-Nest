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
import {StarshipsService} from './starships.service';
import {CreateStarshipsDto} from './dto/create-starships.dto';
import {UpdateStarshipsDto} from './dto/update-starships.dto';
import {StarshipsSerializeInterceptor} from './interceptors/starships.serialize.interceptor';
import {AuthenticatedGuard} from '../auth/guards/local-auth.guard';
import {Roles} from '../decorators/roles.decorator';
import {RolesGuard} from '../guards/roles.guard';
import {ApiBody, ApiTags} from '@nestjs/swagger';
import mockStarshipsDTO from '../mocks/starships/mockStarshipsDTO';

@Controller('starships')
@ApiTags('Starships')
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseInterceptors(StarshipsSerializeInterceptor)
export class StarshipsController {
    constructor(private readonly starshipsService: StarshipsService) {
    }

    @Post()
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    @ApiBody({
        type: CreateStarshipsDto,
        description: 'Admin role required.',
        examples: {
            a: {
                value: mockStarshipsDTO,
                summary: 'Starship Entity',
            },
        }
    })
    create(@Body() createStarshipsDto: CreateStarshipsDto) {
        return this.starshipsService.create(createStarshipsDto);
    }

    @Get()
    @Roles(['admin', 'user'])
    findAll() {
        return this.starshipsService.findAll();
    }

    @Get('/:id')
    @Roles(['admin', 'user'])
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const starship = await this.starshipsService.findOne(id)

        if (!starship) throw new NotFoundException('No such starship!');

        return starship;
    }

    @Patch('/:id')
    @Roles(['admin'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    @ApiBody({
        type: UpdateStarshipsDto,
        description: 'Admin role required.',
        examples: {
            a: {
                value: {
                    name: 'New starship name'
                },
                summary: 'Update Starship',
            },
        }
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateStarshipsDto: UpdateStarshipsDto) {
        return this.starshipsService.update(id, updateStarshipsDto);
    }

    @Delete('/:id')
    @Roles(['admin'])
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.starshipsService.remove(id);
    }
}
