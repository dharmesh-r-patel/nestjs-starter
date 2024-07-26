import { Module } from '@nestjs/common';

import { HomeController } from './home.controller';
import { HomeService } from './home.service';

/**
 * @fileoverview
 * This file defines the `HomeModule` class, which is responsible for the home-related functionalities of the application.
 *
 * @module
 * @description
 * The `HomeModule` class configures the home feature of the application by declaring its controller and service.
 * This module handles the business logic and request handling for home-related endpoints.
 */

@Module({
    imports: [],
    controllers: [
        /**
         * Controller responsible for handling incoming requests and returning responses related to the home feature.
         */
        HomeController,
    ],
    providers: [
        /**
         * Service responsible for handling the business logic related to the home feature.
         */
        HomeService,
    ],
})
export class HomeModule {}
