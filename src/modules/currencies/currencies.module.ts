import { Module } from '@nestjs/common';

import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { Query } from './query';

/**
 * @fileoverview
 * This file defines the `CurrenciesModule`, which is responsible for managing currency-related functionalities.
 *
 * @module
 * @description
 * The `CurrenciesModule` bundles together the controller and service related to currencies,
 * along with any other necessary providers.
 */
@Module({
    controllers: [CurrenciesController],
    providers: [CurrenciesService, Query],
})
export class CurrenciesModule {}
