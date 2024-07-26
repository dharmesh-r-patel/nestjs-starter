import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

// import * as dotenv from 'dotenv';

import { HelperModule } from '@common/helper/helper.module';
import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import fileConfig from '@config/file.config';

import { ApiModule } from '../modules/api.module';

import { AppController } from './app.controller';

const ENV = process.env.NODE_ENV;

/**
 * @fileoverview
 * This file contains the `AppModule` class, which is the root module of the NestJS application.
 *
 * @module
 * @description
 * The `AppModule` class is responsible for importing and configuring the core modules of the application.
 * It includes configuration for environment variables, database connections, and health checks.
 */

@Module({
    controllers: [AppController],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig, fileConfig],
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
        ApiModule,
        TerminusModule,
        HelperModule,
    ],
})
export class AppModule {}
