import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {Film} from '../../films/entities/film.entity';
import {Person} from '../../people/entities/person.entity';
import {Starship} from '../entities/starship.entity';

type SerezlizedEntity = Film | Person | string;

@Injectable()
export class StarshipsSerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data: Starship | Starship[]) => {
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

function entitySerializer(entity: Starship) {
    for (const item in entity) {
        if (Array.isArray(entity[item as keyof Starship])) {
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