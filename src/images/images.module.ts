import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {ImagesController} from './images.controller';
import {ImagesService} from './images.service';
import {ImagePerson} from './entities/image.person.entity';
import {Person} from '../people/entities/person.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ImagePerson, Person])],
    controllers: [ImagesController],
    providers: [ImagesService],
})
export class ImagesModule {
}
