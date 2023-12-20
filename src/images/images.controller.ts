import {
    Body,
    Controller, Delete,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    UploadedFile,
    UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import {ImagesService} from './images.service';
import {PeopleService} from '../people/people.service';
import {FileInterceptor} from '@nestjs/platform-express';
import * as multerSetting from '../utils/multerFileUpload';
import {ImageDto} from './dto/image.dto';

@Controller('image')
export class ImagesController {
    constructor(
        private readonly imagesService: ImagesService,
        private readonly peopleService: PeopleService
    ) {
    }

    @Post('/add/:id')
    @UseInterceptors(FileInterceptor('file', multerSetting))
    async addImage(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) throw new NotFoundException('No file!');

        const person = await this.peopleService.findOne(1);

        if (!person) throw new NotFoundException('No such user!');

        return await this.imagesService.addImage(file, person);
    }

    @Delete('/delete/:id')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    async deleteImage(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: ImageDto
    ) {
        const {image} = body;
        const person = await this.peopleService.findOne(1);

        if (!person) throw new NotFoundException('No such user!');

        return await this.imagesService.deleteImage(image);
    }
}
