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
import {StarshipsService} from './starships.service';
import {CreateStarshipsDto} from './dto/create-starships.dto';
import {UpdateStarshipsDto} from './dto/update-starships.dto';
import {StarshipsSerializeInterceptor} from './interceptors/starships.serialize.interceptor';

@Controller('starships')
@UseInterceptors(StarshipsSerializeInterceptor)
export class StarshipsController {
    constructor(private readonly starshipsService: StarshipsService) {
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    create(@Body() createStarshipsDto: CreateStarshipsDto) {
        return this.starshipsService.create(createStarshipsDto);
    }

    @Get()
    findAll() {
        return this.starshipsService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const starship = await this.starshipsService.findOne(id)

        if (!starship) throw new NotFoundException('No such starship!');

        return starship;
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    update(@Param('id', ParseIntPipe) id: number, @Body() updateStarshipsDto: UpdateStarshipsDto) {
        return this.starshipsService.update(id, updateStarshipsDto);
    }

    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.starshipsService.remove(id);
    }
}
