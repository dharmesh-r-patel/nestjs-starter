import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpErrorFilter } from '@core/exceptions/http-error.filter';

import { CountriesModule } from './countries/countries.module';
import { FilesModule } from './files/files.module';
import { HomeModule } from './home/home.module';

@Module({
    imports: [CountriesModule, FilesModule, HomeModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
    ],
})
export class ApiModule {}
