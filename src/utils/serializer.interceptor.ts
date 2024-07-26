import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import deepResolvePromises from './deep-resolver';

/**
 * Interceptor that resolves all nested promises in the response data.
 *
 * This interceptor is designed to be used within a NestJS application to ensure that any promises
 * within the response data are fully resolved before the response is sent to the client.
 * It uses the `deepResolvePromises` function to recursively handle promises in nested structures.
 *
 * @export
 * @class ResolvePromisesInterceptor
 * @implements {NestInterceptor}
 */

@Injectable()
export class ResolvePromisesInterceptor implements NestInterceptor {
    /**
     * Intercepts the request and resolves nested promises in the response data.
     *
     * @param {ExecutionContext} context - The execution context of the request.
     * @param {CallHandler} next - The handler for the request.
     * @returns {Observable<unknown>} - An observable that emits the resolved data.
     */

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(map((data) => deepResolvePromises(data)));
    }
}
