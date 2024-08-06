import { Controller, Get, Inject } from '@nestjs/common'; // VERSION_NEUTRAL
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import Logger, { LoggerKey } from '@infineit/winston-logger/logger/domain/logger';

import { PrismaService } from '@services/prisma.service';
// import { PublicRoute } from 'src/core/decorators/public.request.decorator';

// @Controller({
//     version: VERSION_NEUTRAL,
//     path: '/',
// })

/**
 * @fileoverview
 * This file contains the `AppController` class, which provides health check endpoints for the application.
 *
 * @module
 * @description
 * The `AppController` is responsible for handling HTTP requests related to the application's health status.
 * It uses `@nestjs/terminus` for health checks and `PrismaService` to check the database connection status.
 */

@ApiTags('Health') // Tags the controller for Swagger API documentation
@Controller() // Decorates the class as a NestJS controller
export class AppController {
    /**
     * Creates an instance of `AppController`.
     *
     * @param {HealthCheckService} healthCheckService - Service for performing health checks.
     * @param {PrismaService} prismaService - Service for interacting with the Prisma ORM.
     */
    constructor(
        @Inject(LoggerKey) private logger: Logger,
        private readonly healthCheckService: HealthCheckService,
        private readonly prismaService: PrismaService
    ) {}

    /**
     * Health check endpoint.
     *
     * @route GET /health
     * @returns {Promise<object>} A promise that resolves with the health check result.
     * @throws {BadRequestException} If the health check fails.
     *
     * @description
     * This endpoint performs a health check by verifying the status of the database connection.
     * The result of the health check is returned in the response.
     *
     * @example
     * // Example response
     * {
     *   "status": "ok",
     *   "info": {
     *     "prisma": "up"
     *   },
     *   "error": {},
     *   "details": {}
     * }
     */

    @Get('/health') // Route to handle GET requests at /health
    @HealthCheck() // Decorator to indicate that this is a health check endpoint
    // @PublicRoute()
    public async getHealth(): Promise<object> {
        return this.healthCheckService.check([() => this.prismaService.isHealthy()]);
    }

    /**
     * Log check endpoint.
     *
     * @route GET /log
     * @returns {Promise<object>} A promise that resolves with the log check result.
     * @throws {BadRequestException} If the health check fails.
     *
     * @description
     * This endpoint performs a log check.
     * The result of the log check is returned in the response.
     *
     * @example
     * // Example response
     * {
     *   "logger": {
     *     "status": "ok"
     *   },
     * }
     */

    @Get('/log')
    getHello(): object {
        // const user = {
        //     id: 'johndoe',
        //     name: 'John Doe',
        //     address: '123 Imaginary Street',
        //     passport: {
        //         number: 'BE123892',
        //         issued: 2023,
        //         expires: 2027,
        //     },
        //     phone: '123-234-544',
        // };
        // this.logger.log('Hello endpoint called');
        // this.logger.log('Hello endpoint called');
        // this.logger.debug('foo %s %o', 'bar');
        // this.logger.verbose({ foo: 'bar' }, 'baz %s', 'qux');
        // Debug
        // Debug
        this.logger.debug(
            'I am a debug message!',
            {
                context: 'Bootstrap',
                correlationId: '1b3fd064-2bed-4bb4-b3af-a5f3686b1b53',
                sourceClass: 'AppModule',
                props: {
                    foo: 'bar-debug',
                    baz: 'qux',
                },
            },
            'getHello'
        );

        // // Info
        // this.logger.info('I am an info message!', {
        //     props: {
        //         foo: 'bar',
        //         baz: 'qux',
        //     },
        // });

        this.logger.info('I am an info message should be set!', {
            context: 'Bootstrap',
            correlationId: '1b3fd064-2bed-4bb4-b3af-a5f3686b1b53',
            sourceClass: 'AppModule',
            // durationMs: 120,
            // stack: 'Error stack trace',
            props: { foo: 'bar', baz: 'qux' },
        });

        // Warn
        this.logger.warn('I am a warn message! new one', {
            context: 'Bootstrap',
            correlationId: '1b3fd064-2bed-4bb4-b3af-a5f3686b1b53',
            sourceClass: 'AppModule',
            props: {
                foo: 'bar',
                baz: 'qux',
            },
            error: new Error('Hello World!'),
        });

        // Error
        this.logger.error('I am an error message!', {
            props: {
                foo: 'bar',
                baz: 'qux',
            },
            error: new Error('Hello World!'),
        });

        // Fatal
        this.logger.fatal('I am a fatal message!', {
            props: {
                foo: 'bar',
                baz: 'qux',
            },
            error: new Error('Hello World!'),
        });

        // Emergency
        this.logger.emergency('I am an emergency message!', {
            props: {
                foo: 'bar',
                baz: 'qux',
            },
            error: new Error('Hello World!'),
        });

        return {
            logger: {
                status: 'ok',
            },
        };
    }
}
