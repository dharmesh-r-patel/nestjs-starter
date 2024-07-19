import { INestApplication } from '@nestjs/common'; // , Logger
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllConfigType } from '@config/type/config.type';

// import { ConfigService } from './common/helper/services/config.service';

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

    const document = SwaggerModule.createDocument(app, documentBuild, {
        deepScanRoutes: true,
    });

    SwaggerModule.setup(docPrefix, app, document, {
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
