import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';

@Injectable()
export class VehiclesSerializeInterceptor implements NestInterceptor {
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
    for (const item in entity) {
        if (Array.isArray(entity[item])) {
            serialize(entity[item]);
        }
    }
}

function serialize(data: any) {
    if (!data.length) return
    for (const item in data) {
        let entity = data[item];
        if (entity) data[item] = entity.url;
    }
}