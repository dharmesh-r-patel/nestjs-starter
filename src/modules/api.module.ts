import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpErrorFilter } from '@core/exceptions/http-error.filter';

import { CountriesModule } from './countries/countries.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { FilesModule } from './files/files.module';
import { HomeModule } from './home/home.module';

/**
 * @fileoverview
 * This file contains the `ApiModule` class, which aggregates several feature modules and sets up a global HTTP error filter.
 *
 * @module
 * @description
 * The `ApiModule` class is responsible for importing feature-specific modules and configuring a global HTTP error filter.
 * It serves as an aggregate module for the API-related functionalities of the application.
 */

@Module({
    imports: [
        /**
         * Module responsible for managing country-related functionalities.
         */
        CountriesModule,

        /**
         * Module responsible for managing currency-related functionalities.
         */
        CurrenciesModule,

        /**
         * Module responsible for managing file-related functionalities.
         */
        FilesModule,

        /**
         * Module responsible for managing home-related functionalities.
         */
        HomeModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
    ],
})
export class ApiModule {}
