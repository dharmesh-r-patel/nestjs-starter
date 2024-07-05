import { STATUS_CODES } from 'http';

import { ArgumentsHost, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'; // Catch
import { Reflector } from '@nestjs/core';

import { Response } from 'express';
// import { QueryFailedError } from "typeorm";
// import * as _ from 'lodash';

// import { PgSQLService } from "../common/shared/services/pgsql.service";
import { constraintErrors } from './constraint-errors';
// import { Query } from './query';

// @Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
	constructor(public reflector: Reflector) {}

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const errorMessage = constraintErrors[exception.constraint];

		const status =
			exception.constraint && exception.constraint.startsWith('UQ')
				? HttpStatus.CONFLICT
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const errorResponse = {
			message: exception.sqlMessage,
			query: exception.query,
		};

		try {
			Logger.error(
				`${request.method} ${request.url}`,
				JSON.stringify(errorResponse),
				'ExceptionFilter'
			);

			// const sqlService = new PgSQLService();
			// const query = new Query();
			// const reqstr = JSON.stringify(_.clone(request.body));
			// const resstr = JSON.stringify(_.clone(errorResponse));
			// sqlService.run(query.addQueryError("DBQuery", request.method, request.url, reqstr, resstr));
		} catch (error) {
			Logger.error(
				`${request.method} ${request.url}`,
				JSON.stringify(errorResponse),
				'ExceptionFilter'
			);
		}
		response.status(status).json({
			statusCode: status,
			error: STATUS_CODES[status],
			message: errorMessage,
		});
	}
}

// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
// import { Response } from 'express';
// import { Prisma } from '@prisma/client';

// @Catch(Prisma.PrismaClientKnownRequestError)
// export class PrismaClientExceptionFilter implements ExceptionFilter {
//   catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const status = HttpStatus.INTERNAL_SERVER_ERROR;

//     let message = exception.message;

//     // Handle specific Prisma errors
//     if (exception.code === 'P2002') {
//       message = 'Unique constraint failed';
//     }

//     response.status(status).json({
//       statusCode: status,
//       message,
//     });
//   }
// }
