import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpErrorFilter } from '../core/exceptions/http-error.filter';

import { CountriesModule } from './countries/countries.module';
import { FilesModule } from './files/files.module';

@Module({
    imports: [CountriesModule, FilesModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
    ],
})
export class ApiModule {}
