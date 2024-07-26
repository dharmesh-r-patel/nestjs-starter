import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AllConfigType } from '@config/type/config.type';

/**
 * @fileoverview
 * This file defines the `HomeService` class, which provides methods for retrieving application information from the configuration.
 *
 * @module
 * @description
 * The `HomeService` class is responsible for retrieving application information from the configuration using the `ConfigService`.
 */
@Injectable()
export class HomeService {
    /**
     * Constructs a new `HomeService`.
     * @param {ConfigService<AllConfigType>} configService - The configuration service used to access application configuration values.
     */
    constructor(private configService: ConfigService<AllConfigType>) {}

    /**
     * Retrieves and returns application information from the configuration.
     * @returns {object} An object containing the application's name, description, app prefix, and API prefix.
     */
    appInfo(): object {
        return {
            name: this.configService.get('app.name', { infer: true }),
            description: this.configService.get('app.description', { infer: true }),
            appPrefix: this.configService.get('app.appPrefix', { infer: true }),
            apiPrefix: this.configService.get('app.apiPrefix', { infer: true }),
        };
    }
}
