import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HomeService } from './home.service';

/**
 * @fileoverview
 * This file defines the `HomeController` class, which handles HTTP requests related to the home feature of the application.
 *
 * @module
 * @description
 * The `HomeController` class is responsible for handling incoming HTTP requests and returning responses for the home-related endpoints.
 * This controller uses the `HomeService` to perform the necessary business logic.
 */

@ApiTags('Home')
@Controller()
export class HomeController {
    /**
     * Constructs a new `HomeController`.
     * @param {HomeService} service - The service used to handle business logic for home-related endpoints.
     */
    constructor(private service: HomeService) {}

    /**
     * Handles GET requests to the root endpoint and returns application information.
     * @returns {object} The application information.
     */
    @Get()
    appInfo(): object {
        return this.service.appInfo();
    }
}
