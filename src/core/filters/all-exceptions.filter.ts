// import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
// import { Reflector, HttpAdapterHost } from "@nestjs/core";
// import {  } from '@nestjs/core';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   constructor(public reflector: Reflector, private readonly httpAdapterHost: HttpAdapterHost) {}
//   catch(exception: unknown, host: ArgumentsHost): void {
//     // In certain situations `httpAdapter` might not be available in the
//     // constructor method, thus we should resolve it here.
//     const { httpAdapter } = this.httpAdapterHost;

//     const ctx = host.switchToHttp();
//     // const response = ctx.getResponse<Response>();
//     // const request = ctx.getRequest<Request>();
//     const httpStatus =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     const responseBody = {
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       // path: request.url,
//       path: httpAdapter.getRequestUrl(ctx.getRequest()),
//       message: (exception as any).message || 'Internal server error',
//     };

//     // response.status(status).json(errorResponse);
//     httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
//   }
// }

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request, Response } from 'express';

/**
 * A global exception filter to catch and handle all exceptions.
 *
 * @class
 * @implements {ExceptionFilter}
 */

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    /**
     * Creates an instance of AllExceptionsFilter.
     *
     * @param {Reflector} reflector - The reflector instance used for metadata reflection.
     */

    constructor(public reflector: Reflector) {}

    /**
     * Catches and handles exceptions thrown by the application.
     *
     * @param {unknown} exception - The exception that was thrown.
     * @param {ArgumentsHost} host - The execution context that contains request and response objects.
     */

    catch(exception: unknown, host: ArgumentsHost) {
        console.log('ALL EXEPTION from filter', exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: (exception as any).message || 'Internal server error',
        };

        response.status(status).json(errorResponse);
    }
}
