import {
    BadRequestException,
    Body,
    Controller, Delete,
    Param,
    ParseIntPipe,
    Post,
    UploadedFile, UseGuards,
    UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import {ImagesService} from './images.service';
import {FileInterceptor} from '@nestjs/platform-express';
import * as multerSetting from '../utils/multerFileUpload';
import {ImageDto} from './dto/image.dto';
import {ImagesSerializeInterceptor} from './interceptors/images.serialize.interceptor';
import {AuthenticatedGuard} from '../auth/guards/local-auth.guard';
import {RolesGuard} from '../guards/roles.guard';
import {Roles} from '../decorators/roles.decorator';
import {ApiTags} from '@nestjs/swagger';

@Controller('image')
@ApiTags('Images')
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseInterceptors(ImagesSerializeInterceptor)
export class ImagesController {
    constructor(
        private readonly imagesService: ImagesService,
    ) {
    }

    @Post('/add/:id')
    @Roles(['admin', 'user'])
    @UseInterceptors(FileInterceptor('file', multerSetting))
    async addImage(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) throw new BadRequestException('No file!');

        return await this.imagesService.addImage(file, id);
    }

    @Delete('/delete/:id')
    @Roles(['admin', 'user'])
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    async deleteImage(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: ImageDto
    ) {
        const {image} = body;
        return await this.imagesService.deleteImage(id, image);
    }
}