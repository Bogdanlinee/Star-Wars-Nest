import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {isArray} from 'class-validator';

@Injectable()
export class TestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...!!!');

        const now = Date.now();
        return next
            .handle()
            .pipe(
                map((data: any) => {
                    for (const item in data) {
                        if (isArray(data[item])) {
                            data[item] = urlsFromEntities(data[item]);
                        }
                    }

                    return {data};
                })
            );
    }
}

function urlsFromEntities(arr: any) {
    return arr.map((item: any) => item.url);
}