import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        const {httpAdapter} = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;


        const message = exception instanceof Error
            ? exception.message || 'Sorry, something went wrong'
            : 'Sorry, something went wrong';

        const responseBody = {
            statusCode: httpStatus,
            message,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}