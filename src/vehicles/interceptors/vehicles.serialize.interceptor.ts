import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {Film} from '../../films/entities/film.entity';
import {Person} from '../../people/entities/person.entity';
import {Vehicle} from '../entities/vehicle.entity';

type SerezlizedEntity = Person | Film | string;

@Injectable()
export class VehiclesSerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data: Vehicle | Vehicle[]) => {
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

function entitySerializer(entity: Vehicle) {
    for (const item in entity) {
        if (Array.isArray(entity[item as keyof Vehicle])) {
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