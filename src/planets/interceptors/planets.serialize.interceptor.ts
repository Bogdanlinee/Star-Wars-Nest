import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {Person} from '../../people/entities/person.entity';
import {Species} from '../../species/entities/species.entity';
import {Film} from '../../films/entities/film.entity';
import {Planet} from '../entities/planet.entity';

type SerezlizedEntity = Person | Species | Film | string;

@Injectable()
export class PlanetsSerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data: Planet | Planet[]) => {
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

function entitySerializer(entity: Planet) {
    for (const item in entity) {
        if (Array.isArray(entity[item as keyof Planet])) {
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