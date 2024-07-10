import { STATUS_CODES } from 'http';

import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    // HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ValidationError } from 'class-validator';
import { Response } from 'express';
import * as _ from 'lodash';

// import { PgSQLService } from "../common/shared/services/pgsql.service";
// import { Query } from './query';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    constructor(public reflector: Reflector) {}

    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest();
        const statusCode = exception.getStatus();
        const r = <any>exception.getResponse();

        if (_.isArray(r.message) && r.message[0] instanceof ValidationError) {
            const validationErrors = <ValidationError[]>r.message;
            r.error = this._validationFilter(validationErrors);
        }

        //put api logic here to fetch from db is erro code found
        r.statusCode = statusCode;
        r.message = STATUS_CODES[statusCode];

        response.status(statusCode).json(r);

        // try {
        //   var sqlService = new PgSQLService();
        //   var query = new Query();
        //   var reqstr = JSON.stringify(_.clone(request.body));
        //   var resstr = JSON.stringify(_.clone(r));
        //   sqlService.run(
        //     query.addQueryError("BadRequest", request.method, request.url, reqstr, resstr)
        //   );
        // } catch (error) {}

        // try {
        //   var sqlService = new PgSQLService();
        //   var query = new Query();
        //   const reqstrobj = { body: _.clone(request.body), header: _.clone(request.header) };
        //   var reqstr = JSON.stringify(reqstrobj);

        //   const resstrobj = { res: _.clone(r), exception: exception.stack };
        //   var resstr = JSON.stringify(resstrobj);
        //   sqlService.run(
        //     query.addQueryError("BadRequest", request.method, request.url, reqstr, resstr)
        //   );
        // } catch (error) {}
    }

    private _validationFilter(validationErrors: ValidationError[]) {
        const errorMessages = {};

        for (const validationError of validationErrors) {
            if (validationError.children && validationError.children.length > 0) {
                const nestedErrorMessage = {};
                for (let i = 0; i < validationError.children[0].children.length; i++) {
                    nestedErrorMessage[validationError.children[0].children[i].property] =
                        Object.values(validationError.children[0].children[i].constraints);
                }
                errorMessages[validationError.property] = nestedErrorMessage;
            } else {
                errorMessages[validationError.property] = Object.values(
                    validationError.constraints
                );
            }
        }
        return errorMessages;
    }
}
