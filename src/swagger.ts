import { INestApplication } from '@nestjs/common'; // , Logger
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllConfigType } from '@config/type/config.type';
import { CountriesModule } from '@modules/countries/countries.module';
import { CurrenciesModule } from '@modules/currencies/currencies.module';
import { FilesModule } from '@modules/files/files.module';
import { HomeModule } from '@modules/home/home.module';

import { AppModule } from './app/app.module';

// import { ConfigService } from './common/helper/services/config.service';

/**
 * Configures and sets up Swagger documentation for the NestJS application.
 *
 * This function creates and configures Swagger documentation based on application configuration.
 * It sets up two separate Swagger documents: one for the main application modules and another
 * for common modules. It also configures various Swagger UI options.
 *
 * @param {INestApplication} app - The NestJS application instance.
 * @returns {Promise<void>} - A promise that resolves when the Swagger setup is complete.
 *
 * @throws {Error} - Throws an error if configuration retrieval fails.
 *
 * @example
 * import { NestFactory } from '@nestjs/core';
 * import { AppModule } from './app.module';
 * import setupSwagger from './setup-swagger';
 *
 * async function bootstrap() {
 *   const app = await NestFactory.create(AppModule);
 *   await setupSwagger(app);
 *   await app.listen(3000);
 * }
 * bootstrap();
 */

export default async function (app: INestApplication) {
    // const configService = app.get(ConfigService);
    const configService = app.get(ConfigService<AllConfigType>);
    // const logger = app.get(Logger);

    const docName: string = configService.getOrThrow('app.name', { infer: true }); //configService.get('APP_NAME');
    const docDesc: string = configService.getOrThrow('app.description', { infer: true }); //configService.get('APP_DESCRIPTION');
    const docVersion: string = configService.getOrThrow('app.version', { infer: true }); //configService.get('APP_VERSION');
    const docPrefix: string = configService.getOrThrow('app.appPrefix', { infer: true }); //configService.get('APP_PREFIX');

    const documentBuild = new DocumentBuilder()
        .setTitle(docName)
        .setDescription(docDesc)
        .setVersion(docVersion)
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'accessToken')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'refreshToken')
        .build();

    const documentmain = SwaggerModule.createDocument(app, documentBuild, {
        deepScanRoutes: true,
        include: [AppModule, HomeModule],
    });

    SwaggerModule.setup(docPrefix, app, documentmain, {
        explorer: true,
        customSiteTitle: docName,
        swaggerOptions: {
            docExpansion: 'none',
            persistAuthorization: true,
            displayOperationId: true,
            operationsSorter: 'method',
            tagsSorter: 'alpha',
            tryItOutEnabled: true,
            filter: true,
        },
    });

    const documentCommon = SwaggerModule.createDocument(app, documentBuild, {
        deepScanRoutes: true,
        include: [CountriesModule, CurrenciesModule, FilesModule],
    });

    SwaggerModule.setup('commons', app, documentCommon, {
        explorer: true,
        customSiteTitle: docName,
        swaggerOptions: {
            docExpansion: 'none',
            persistAuthorization: true,
            displayOperationId: true,
            operationsSorter: 'method',
            tagsSorter: 'alpha',
            tryItOutEnabled: true,
            filter: true,
        },
    });
    // logger.log(`Docs will serve on ${docPrefix}`, 'NestApplication');
}
