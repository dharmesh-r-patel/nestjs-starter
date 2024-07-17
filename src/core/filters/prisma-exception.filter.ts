import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        console.log('PRISMA CLIENT EXCEPTION', exception.message);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const message = exception.message.replace(/\n/g, '');
        switch (exception.code) {
            case 'P2002': {
                // Unique constraint failed on the {constraint}
                const status = HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: message,
                });
                break;
            }
            case 'P2000': {
                // The provided value for the column is too long for the column’s type. Column: {column_name}
                const status = HttpStatus.BAD_REQUEST;
                response.status(status).json({
                    statusCode: status,
                    message: message,
                });
                break;
            }
            case 'P2025': {
                // An operation failed because it depends on one or more records that were required but not found. {cause}
                const status = HttpStatus.NOT_FOUND;
                response.status(status).json({
                    statusCode: status,
                    message: message,
                });
                break;
            }
            case 'P2010': {
                // An operation failed because it depends on one or more records that were required but not found. {cause}
                const status = HttpStatus.BAD_REQUEST;
                response.status(status).json({
                    statusCode: status,
                    message: message,
                });
                break;
            }
            default:
                // default 500 error code
                super.catch(exception, host);
                break;
        }
    }

    //   catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    //     const ctx = host.switchToHttp();
    //     const response = ctx.getResponse<Response>();
    //     const status = HttpStatus.BAD_REQUEST;

    //     const errorResponse = {
    //       statusCode: status,
    //       timestamp: new Date().toISOString(),
    //       message: exception.message,
    //     };

    //     response.status(status).json(errorResponse);
    //   }
}
