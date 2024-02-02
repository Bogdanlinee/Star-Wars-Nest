import {
    BadRequestException,
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
    ) {
    }

    @Post('/add/:id')
    @UseInterceptors(FileInterceptor('file', multerSetting))
    async addImage(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) throw new BadRequestException('No file!');

        return await this.imagesService.addImage(file, id);
    }

    @Delete('/delete/:id')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    async deleteImage(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: ImageDto
    ) {
        const {image} = body;
        return await this.imagesService.deleteImage(id, image);
    }
}