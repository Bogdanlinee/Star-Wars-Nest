import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {Film} from '../entities/film.entity';
import {Person} from '../../people/entities/person.entity';
import {Species} from '../../species/entities/species.entity';
import {Vehicle} from '../../vehicles/entities/vehicle.entity';
import {Starship} from '../../starships/entities/starship.entity';
import {Planet} from '../../planets/entities/planet.entity';

type SerezlizedEntity = Person | Species | Vehicle | Starship | Planet | string;

@Injectable()
export class FilmsSerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data: Film | Film[]) => {
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

function entitySerializer(entity: Film) {
    for (const item in entity) {
        if (Array.isArray(entity[item as keyof Film])) {
            serialize(entity[item as keyof SerezlizedEntity]);
        }
    }
}

function serialize(data: SerezlizedEntity[]) {
    if (!data.length) return
    for (const item in data) {
        let entity = data[item];
        if (!entity) continue;
        if (typeof entity !== 'string') data[item] = entity.url;
    }
}