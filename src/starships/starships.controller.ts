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
import {StarshipsService} from './starships.service';
import {CreateStarshipsDto} from './dto/create-starships.dto';
import {UpdateStarshipsDto} from './dto/update-starships.dto';

@Controller('starships')
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
        const species = await this.starshipsService.findOne(id)

        if (!species) throw new NotFoundException('No such starship!');

        return species;
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
