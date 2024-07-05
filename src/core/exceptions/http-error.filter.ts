import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	Logger,
	HttpException,
	HttpStatus,
} from '@nestjs/common';

// import * as _ from 'lodash';

//   import { SQLService } from "../shared/services/sql.service";

//   import { Query } from "./query";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		const status = exception.getStatus
			? exception.getStatus()
			: HttpStatus.INTERNAL_SERVER_ERROR;
		const errorResponse = {
			code: status,
			timestamp: new Date().toLocaleTimeString,
			path: request.url,
			method: request.method,
			message:
				status !== HttpStatus.INTERNAL_SERVER_ERROR
					? exception.message || null
					: 'Internal server error',
		};

		if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
			Logger.error(`${request.method} ${request.url}`, exception.stack, 'ExceptionFilter');
		} else {
			Logger.error(
				`${request.method} ${request.url}`,
				JSON.stringify(errorResponse),
				'ExceptionFilter'
			);
		}

		response.status(status).json(errorResponse);

		//   try {
		//     const sqlService = new SQLService();
		//     const query = new Query();
		//     const reqstrobj = { body: _.clone(request.body), header: _.clone(request.header) };
		//     const reqstr = JSON.stringify(reqstrobj);

		//     const resstrobj = { res: _.clone(errorResponse), exception: exception.stack };
		//     const resstr = JSON.stringify(resstrobj);
		//     sqlService.run(
		//       query.addHttpQueryError("HTTPERROR", request.method, request.url, reqstr, resstr)
		//     );
		//   } catch (error) {}
	}
}
