import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {Person} from '../../people/entities/person.entity';
import {Film} from '../../films/entities/film.entity';
import {Planet} from '../../planets/entities/planet.entity';
import {Species} from '../entities/species.entity';

type SerezlizedEntity = Film | Person | Planet | string;

@Injectable()
export class SpeciesSerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data: Species | Species[]) => {
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

function entitySerializer(entity: Species) {
    for (const item in entity) {
        if (Array.isArray(entity[item as keyof Species])) {
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