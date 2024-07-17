import { ClassSerializerInterceptor, ValidationPipe, BadRequestException } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import compression from 'compression';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { HelperModule } from '@common/helper/helper.module';
import { AllExceptionsFilter } from '@filters/all-exceptions.filter';
import { BadRequestExceptionFilter } from '@filters/bad-request.filter';
import { PrismaClientExceptionFilter } from '@filters/prisma-exception.filter';
// import { QueryFailedFilter } from '@filters/query-failed.filter';
import { ConfigService } from '@services/config.service';

import { AppModule } from './app/app.module';
import swaggerInit from './swagger';
// import { initAdapters } from "./adapters.init";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();
    app.enableShutdownHooks();
    // app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

    const configService = app.select(HelperModule).get(ConfigService);

    const globalPrefix: string = configService.get('API_PREFIX');

    app.setGlobalPrefix(globalPrefix);
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

    const reflector = app.get(Reflector);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(
        new AllExceptionsFilter(reflector),
        new PrismaClientExceptionFilter(httpAdapter),
        // new QueryFailedFilter(reflector),
        new BadRequestExceptionFilter(reflector)
    );

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    if (['development', 'staging', 'testing'].includes(configService.nodeEnv)) {
        swaggerInit(app);
    }

    app.use(helmet());

    app.use(
        RateLimit({
            windowMs: 5 * 60 * 1000, // 5 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        })
    );
    app.use(compression());

    // Logger.debug("***********************************************" + configService.nodeEnv);

    console.debug('Nest JS is running on PORT is -' + process.env.PORT);

    //  await app.listen(process.env.PORT);
    const port = configService.getNumber('PORT');
    await app.listen(port);

    console.info(`server running on port ${port}`);
}
bootstrap();
