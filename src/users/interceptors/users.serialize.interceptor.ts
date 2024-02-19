import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {User} from '../entities/user.entity';


@Injectable()
export class UsersSerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data: User) => {
                    const {password, ...result} = data;
                    return result;
                })
            );
    }
}