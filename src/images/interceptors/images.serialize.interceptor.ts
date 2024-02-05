import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {ImagePerson} from '../entities/image.person.entity';

@Injectable()
export class ImagesSerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data: Partial<ImagePerson>) => {
                    if (data.hasOwnProperty('person')) delete data.person;
                    if (data.hasOwnProperty('id')) delete data.id;
                    if (data.hasOwnProperty('deletedAt')) delete data.deletedAt;
                    if (data.hasOwnProperty('createdDate')) delete data.createdDate;
                    return {data}
                })
            );
    }
}