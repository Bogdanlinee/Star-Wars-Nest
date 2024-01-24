import {Module} from '@nestjs/common';
import {StarshipsService} from './starships.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Starship} from './entities/starship.entity';
import {StarshipsController} from './starships.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Starship])],
    controllers: [StarshipsController],
    providers: [StarshipsService]
})
export class StarshipsModule {
}
