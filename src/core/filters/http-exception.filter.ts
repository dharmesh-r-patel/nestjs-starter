import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

import { Request, Response } from 'express';

/**
 * Exception filter for handling HTTP exceptions in a NestJS application.
 *
 * This filter catches all `HttpException` instances and formats the response
 * with the status code, timestamp, and request path.
 *
 * @export
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 */

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    /**
     * Handles the HTTP exception and formats the error response.
     *
     * @param {HttpException} exception The HTTP exception to handle.
     * @param {ArgumentsHost} host The arguments host for accessing request and response objects.
     *
     * @memberof HttpExceptionFilter
     */

    catch(exception: HttpException, host: ArgumentsHost) {
        console.log('HTTP EXEPTION from filter');
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
