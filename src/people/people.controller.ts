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
    UseInterceptors,
    UploadedFile, BadRequestException,
} from '@nestjs/common';
import {PeopleService} from './people.service';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import * as multerSetting from '../multerTest';

@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {
    }

    @Post('/:id/image')
    @UseInterceptors(FileInterceptor('file', multerSetting))
    async addImage(
        @UploadedFile() file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number
    ) {
        await this.peopleService.addImage(file, id);
        return 'Going To Add Image Here';
    }


    @Delete('/:id/image/:imageUrl')
    deleteImage() {
        return 'Going To Delete Image Here';
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    create(@Body() createPersonDto: CreatePersonDto) {
        return this.peopleService.create(createPersonDto);
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.peopleService.findOne(id);
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