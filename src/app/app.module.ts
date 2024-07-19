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
