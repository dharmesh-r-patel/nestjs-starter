import { join } from 'path';

import { ClassSerializerInterceptor, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { useContainer } from 'class-validator';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';

// import { HelperModule } from '@common/helper/helper.module';
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

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    const configService = app.get(ConfigService<AllConfigType>);

    app.set('trust proxy', 1); // 1 indicates trusting the first proxy
    app.enableCors();
    app.enableShutdownHooks();

    // app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

    // dx const configService = app.select(HelperModule).get(ConfigService);

    // const globalPrefix: string = configService.get('API_PREFIX');
    app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }), {
        exclude: ['/'],
    });

    // app.setGlobalPrefix(globalPrefix);
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

    app.useGlobalInterceptors(
        // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
        // https://github.com/typestack/class-transformer/issues/549
        new ResolvePromisesInterceptor(),
        new ClassSerializerInterceptor(reflector)
    );

    const node_env = configService.getOrThrow('app.nodeEnv', { infer: true });

    app.useStaticAssets(join(__dirname, '..', 'public'));

    if (['development', 'staging', 'testing'].includes(node_env)) {
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
    const port = configService.getOrThrow('app.port', { infer: true });
    await app.listen(port);

    console.info(`server running on port ${port}`);
}
void bootstrap();
