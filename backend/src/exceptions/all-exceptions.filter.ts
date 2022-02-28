import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseData = {
            data: {},
        };

        if (exception instanceof HttpException) {
            const res = exception.getResponse();

            responseData['status-code'] = exception.getStatus();
            responseData['error'] = res['error'];
            responseData['message'] = res['message'];

            if (process.env.NODE_ENV === 'development') {
                responseData['stack'] = exception.stack;
            }
        }

        response.status(status).json(responseData);
    }
}
