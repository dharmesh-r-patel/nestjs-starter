import { Module } from '@nestjs/common';

import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { Query } from './query';

@Module({
    controllers: [CurrenciesController],
    providers: [CurrenciesService, Query],
})
export class CurrenciesModule {}
