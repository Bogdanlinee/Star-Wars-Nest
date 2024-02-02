import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';

@Injectable()
export class PeopleSerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data: any) => {
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

function entitySerializer(entity: any) {
    const restEntities = ['species', 'starships', 'films', 'vehicles'];

    for (const item in entity) {
        if (item === 'images') serializeImages(entity[item]);
        if (restEntities.includes(item)) serializeRest(entity[item]);
        if (item === 'homeworld') {
            if (entity.homeworld && entity.homeworld.url) {
                entity.homeworld = entity.homeworld.url
            }
        }
    }
}

function serializeImages(data: any) {
    if (!data.length) return
    for (const item in data) {
        let imageEntity = data[item];
        if (imageEntity) data[item] = imageEntity.image;
    }
}

function serializeRest(data: any) {
    if (!data.length) return
    for (const item in data) {
        let entity = data[item];
        if (entity) data[item] = entity.url;
    }
}