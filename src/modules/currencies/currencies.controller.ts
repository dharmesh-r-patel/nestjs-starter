import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';

import { PaginationResponse, PaginationResponseDto } from '@utils/dto/pagination-response.dto';
import { PaginationQueryDto } from '@utils/dto/pagination.dto';

import { CurrenciesService } from './currencies.service';
import { CreateDto } from './dto/create.dto';
import { Currency } from './dto/currency';
import { UpdateDto } from './dto/update.dto';

const modules = 'currencies';

/**
 * @fileoverview
 * This file defines the `CurrenciesController`, which handles HTTP requests related to currencies.
 * It provides endpoints to create, update, retrieve, and delete currencies.
 *
 * @module
 * @description
 * The `CurrenciesController` is responsible for exposing endpoints that interact with the `CurrenciesService`.
 * It uses various HTTP methods to manage currency data and handles responses with appropriate HTTP status codes.
 */

@ApiTags('Currencies')
@Controller()
export class CurrenciesController {
    constructor(private readonly currenciesService: CurrenciesService) {}

    /**
     * @route POST /v1/currencies
     * @description Create a new currency.
     * @param {CreateDto} createDto - The data required to create a new currency.
     * @returns {Promise<Currency>} The created currency object.
     */

    @Post(`v1/${modules}`)
    @HttpCode(HttpStatus.OK)
    @ApiCreatedResponse({
        type: Currency,
        description: 'Create currency',
    })
    async create(@Body() createDto: CreateDto): Promise<Currency> {
        const created = await this.currenciesService.create(createDto);
        return created;
    }

    /**
     * @route PATCH /v1/currencies/:id_currency
     * @description Update an existing currency by its ID.
     * @param {string} id - The ID of the currency to be updated.
     * @param {UpdateDto} updateDto - The data to update the currency with.
     * @returns {Promise<Currency | null>} The updated currency object or null if not found.
     */

    @Patch(`v1/${modules}/:id_currency`)
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'id_currency', type: String })
    @ApiOkResponse({
        type: Currency,
        description: 'Update Currency',
    })
    async update(
        @Param('id_currency') id: string,
        @Body() updateDto: UpdateDto
    ): Promise<Currency | null> {
        console.log('UPDATE', id, updateDto);
        const updated = await this.currenciesService.update(id, updateDto);
        return updated;
    }

    /**
     * @route GET /v1/currencies
     * @description Retrieve a list of currencies with pagination.
     * @param {PaginationQueryDto} query - The pagination and filtering parameters.
     * @returns {Promise<PaginationResponseDto<Currency>>} A paginated list of currencies.
     */

    @Get(`v1/${modules}`)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PaginationResponse(Currency) })
    async findAll(@Query() query: PaginationQueryDto): Promise<PaginationResponseDto<Currency>> {
        const get_all = await this.currenciesService.findAll(query);

        return get_all;
    }

    /**
     * @route DELETE /v1/currencies/:id_currency
     * @description Delete a currency by its ID.
     * @param {string} id - The ID of the currency to be deleted.
     * @returns {Promise<object>} An object indicating the deletion result.
     */

    @Delete(`v1/${modules}/:id_currency`)
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'id_currency', type: String })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: `${modules} has been successfully deleted.`,
    })
    async delete(@Param('id_currency') id: string): Promise<object> {
        const deleted = await this.currenciesService.delete(id);

        return deleted;
    }
}
