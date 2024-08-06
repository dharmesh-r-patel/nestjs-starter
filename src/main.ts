/**
 * @fileoverview
 * This file contains the configuration and setup for the NestJS application.
 * The application uses Compodoc for generating documentation.
 *
 * @module
 * @description
 * This module sets up and configures the NestJS application including middleware, exception handling,
 * interceptors, and server setup. It also integrates Compodoc for generating API documentation.
 */

import { join } from 'path';

import { ClassSerializerInterceptor, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import NestjsLoggerServiceAdapter from '@infineit/winston-logger/logger/infrastructure/nestjs/nestjsLoggerServiceAdapter';
import { useContainer } from 'class-validator';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';

// import { HelperModule } from '@common/helper/helper.module';
// Import modules and filters
import { AllConfigType } from '@config/type/config.type';
import { AllExceptionsFilter } from '@filters/all-exceptions.filter';
import { BadRequestExceptionFilter } from '@filters/bad-request.filter';
import { PrismaClientExceptionFilter } from '@filters/prisma-exception.filter';
// import { QueryFailedFilter } from '@filters/query-failed.filter';
// import { ConfigService } from '@services/config.service';
import { ResolvePromisesInterceptor } from '@utils/serializer.interceptor';

import { AppModule } from './app/app.module';
import swaggerInit from './swagger';
// import { initAdapters } from "./adapters.init";

/**
 * Initializes and starts the NestJS application.
 * Configures global settings, middleware, and exception handling.
 * Sets up Swagger documentation if in development, staging, or testing environments.
 *
 * @async
 * @function bootstrap
 * @returns {Promise<void>} A promise that resolves when the server starts.
 */

async function bootstrap(): Promise<void> {
    // Create a NestJS application instance
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

    app.useLogger(app.get(NestjsLoggerServiceAdapter));
    app.flushLogs();

    // Use the application container for dependency injection
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // Retrieve the configuration service
    const configService = app.get(ConfigService<AllConfigType>);

    // Trust the first proxy (useful if the app is behind a reverse proxy)
    app.set('trust proxy', 1); // 1 indicates trusting the first proxy

    // Enable CORS (Cross-Origin Resource Sharing)
    app.enableCors();

    // Enable shutdown hooks to gracefully handle application termination
    app.enableShutdownHooks();

    // app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

    // dx const configService = app.select(HelperModule).get(ConfigService);

    // const globalPrefix: string = configService.get('API_PREFIX');
    // Set a global prefix for the API routes
    app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }), {
        exclude: ['/'],
    });

    // app.setGlobalPrefix(globalPrefix);
    // Configure global validation pipes
    app.useGlobalPipes(
        new ValidationPipe({
            // disableErrorMessages: true,
            whitelist: true,
            transform: true,
            dismissDefaultMessages: false,
            validationError: {
                target: false,
            },
            exceptionFactory: (errors) => new BadRequestException(errors),
        })
    );

    // Retrieve the reflector and HTTP adapter host instances
    const reflector = app.get(Reflector);
    const { httpAdapter } = app.get(HttpAdapterHost);

    // Set up global exception filters
    app.useGlobalFilters(
        new AllExceptionsFilter(reflector),
        new PrismaClientExceptionFilter(httpAdapter),
        // new QueryFailedFilter(reflector),
        new BadRequestExceptionFilter(reflector)
    );

    // Set up global interceptors
    app.useGlobalInterceptors(
        // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
        // https://github.com/typestack/class-transformer/issues/549
        new ResolvePromisesInterceptor(),
        new ClassSerializerInterceptor(reflector)
    );

    // Get the current environment configuration
    const node_env = configService.getOrThrow('app.nodeEnv', { infer: true });

    // Serve static assets from the 'public' directory
    app.useStaticAssets(join(__dirname, '..', 'public'));

    // Initialize Swagger documentation based on the environment
    if (['development', 'staging', 'testing'].includes(node_env)) {
        swaggerInit(app);
    }

    // Configure security headers
    app.use(helmet());

    // Set up rate limiting to prevent abuse
    app.use(
        RateLimit({
            windowMs: 5 * 60 * 1000, // 5 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        })
    );

    // Enable compression for responses
    app.use(compression());

    // Logger.debug("***********************************************" + configService.nodeEnv);

    // Log server port information
    console.debug('Nest JS is running on PORT is -' + process.env.PORT);

    //  await app.listen(process.env.PORT);
    // Start the server on the configured port
    const port = configService.getOrThrow('app.port', { infer: true });
    await app.listen(port);

    // Log the server startup information
    console.info(`server running on port ${port}`);
}
// Bootstrap the application
void bootstrap();
