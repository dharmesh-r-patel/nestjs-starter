import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpErrorFilter } from '../core/exceptions/http-error.filter';

@Module({
	imports: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpErrorFilter,
		},
	],
})
export class ApiModule {}
