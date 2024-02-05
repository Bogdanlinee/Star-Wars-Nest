import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {Species} from '../../species/entities/species.entity';
import {Vehicle} from '../../vehicles/entities/vehicle.entity';
import {Starship} from '../../starships/entities/starship.entity';
import {Planet} from '../../planets/entities/planet.entity';
import {Person} from '../entities/person.entity';
import {ImagePerson} from '../../images/entities/image.person.entity';
import {Film} from '../../films/entities/film.entity';

type SerezlizedEntity = ImagePerson | Film | Species | Vehicle | Starship | Planet | string;
type SerezlizedPersonEntity = Omit<Person, 'homeworld'> & { homeworld: Person | string };

@Injectable()
export class PeopleSerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data: SerezlizedPersonEntity | SerezlizedPersonEntity[]) => {
                    if (Array.isArray(data)) {
                        for (const item in data) {
                            entitySerializer(data[item]);
                        }
                    } else {
                        entitySerializer(data);
                    }
                    return {data};
                })
            );
    }
}

function entitySerializer(entity: SerezlizedPersonEntity) {
    const restEntities = ['species', 'starships', 'films', 'vehicles'];

    for (const item in entity) {
        if (item === 'images') serializeImages(entity[item]);
        if (restEntities.includes(item)) serializeRest(entity[item as keyof SerezlizedEntity]);
        if (item === 'homeworld') {
            if (typeof entity.homeworld !== 'string' && entity.homeworld && entity.homeworld.url) {
                entity.homeworld = entity.homeworld.url
            }
        }
    }
}

function serializeImages(data: SerezlizedEntity[]) {
    if (!data.length) return
    for (const item in data) {
        let imageEntity = data[item];
        if (imageEntity instanceof ImagePerson) data[item] = imageEntity.image;
    }
}

function serializeRest(data: SerezlizedEntity[]) {
    if (!data.length) return
    for (const item in data) {
        let entity = data[item];
        if (typeof entity !== 'string' && !(entity instanceof ImagePerson)) data[item] = entity.url;
    }
}