import {Controller, Get} from '@nestjs/common';
import {ImagesService} from './images.service';

@Controller('testUploadImage')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {
    }

    @Get()
    async testUploadImage() {
        return await this.imagesService.testResponse();
    }
}
