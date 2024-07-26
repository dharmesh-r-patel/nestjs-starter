import { Controller, Get } from '@nestjs/common'; // VERSION_NEUTRAL
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

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
}
