import { Controller, Get, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { PaginationResponse, PaginationResponseDto } from '@utils/dto/pagination-response.dto';
import { PaginationQueryDto } from '@utils/dto/pagination.dto';

import { CountriesService } from './countries.service';
import { Country } from './dto/country';

/**
 * @fileoverview
 * This file defines the `CountriesController`, which handles HTTP requests related to countries.
 *
 * @module
 * @description
 * The `CountriesController` is responsible for handling requests to find and retrieve country information.
 */
@ApiTags('Countries')
@Controller()
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    /***
     * Find all countries
     *
     * @param {PaginationQueryDto} query - The pagination query parameters.
     * @returns {Promise<PaginationResponseDto<Country>>} A promise that resolves to a paginated response of countries.
     *
     * @example
     * GET /v1/countries?page=1&limit=10
     *
     * @description
     * This endpoint allows the client to retrieve a paginated list of countries.
     *
     * @see PaginationQueryDto
     * @see PaginationResponseDto
     * @see Country
     */

    @Get('v1/countries')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PaginationResponse(Country) })
    async findAll(@Query() query: PaginationQueryDto): Promise<PaginationResponseDto<Country>> {
        const get_all = await this.countriesService.findAll(query);

        return get_all;
    }
}

// import { Controller, Get, Query, HttpStatus, HttpCode } from '@nestjs/common';
// import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

// import {
//     InfinityPaginationResponse,
//     InfinityPaginationResponseDto,
// } from '@utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '@utils/infinity-pagination';

// import { CountriesService } from './countries.service';
// import { Country } from './domain/country';
// import { QueryCountryDto } from './dto/query-country.dto';

// @ApiTags('Countries')
// @Controller()
// export class CountriesController {
//     constructor(private readonly countriesService: CountriesService) {}

//     /***
//      * Find all countries
//      */

//     @Get('v1/countries')
//     @HttpCode(HttpStatus.OK)
//     @ApiOkResponse({
//         type: InfinityPaginationResponse(Country),
//     })
//     async findAll(
//         @Query() query: QueryCountryDto
//     ): Promise<InfinityPaginationResponseDto<Country>> {
//         console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHA');
//         const page = query?.page ?? 1;
//         let limit = query?.limit ?? 10;
//         if (limit > 50) {
//             limit = 50;
//         }

//         return infinityPagination(
//             await this.countriesService.findManyWithPagination({
//                 filterOptions: query?.filters,
//                 sortOptions: query?.sort,
//                 paginationOptions: {
//                     page,
//                     limit,
//                 },
//             }),
//             { page, limit }
//         );
//     }
// }

// import { Controller, Get, Query, HttpStatus, HttpCode } from '@nestjs/common';
// import { ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger';

// // import {
// //     InfinityPaginationResponse,
// //     InfinityPaginationResponseDto,
// // } from '@utils/dto/infinity-pagination-response.dto';
// // import { infinityPagination } from '@utils/infinity-pagination';

// import { ApiFilterQuery } from '@decorators/api.filter.query';
// import {
//     PaginationQueryDto,
//     PaginatedResultDto,
//     FilterQueryDto,
//     // ApiFilterQuery,
// } from '@utils/dto/pagination.dto';

// // import { ApiNestedQuery } from '../../decorators/api-filter-query';

// import { CountriesService } from './countries.service';
// import { Country } from './domain/country';
// // import { QueryCountryDto } from './dto/query-country.dto';

// @ApiTags('Countries')
// @Controller()
// export class CountriesController {
//     constructor(private readonly countriesService: CountriesService) {}

//     /***
//      * Find all countries
//      */

//     @Get('v1/countries')
//     @HttpCode(HttpStatus.OK)
//     // @ApiQuery({
//     //     name: 'filters',
//     //     required: false,
//     //     type: String,
//     //     description: 'Array of filter objects as a JSON string',
//     //     example:
//     //         '[{"field":"name","operator":"LIKE","value":"John"},{"field":"age","operator":">","value":"30"}]',
//     // })
//     // @ApiQuery({
//     //     name: 'sort',
//     //     required: false,
//     //     type: String,
//     //     description: 'Array of sort objects as a JSON string',
//     //     example: '[{"field":"name","direction":"ASC"},{"field":"age","direction":"DESC"}]',
//     // })
//     // @ApiFilterQuery('filters', FilterQueryDto, 0)
//     // @ApiFilterQuery('filters', FilterQueryDto, 1)
//     @ApiOkResponse({ type: PaginatedResultDto })
//     async findAll(
//         @Query() paginationQuery: PaginationQueryDto
//     ): Promise<PaginatedResultDto<Country>> {
//         return this.countriesService.findAll(paginationQuery);
//     }
// }

// // import { Controller, Get, Query, HttpStatus, HttpCode } from '@nestjs/common';
// // import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

// // import {
// //     InfinityPaginationResponse,
// //     InfinityPaginationResponseDto,
// // } from '@utils/dto/infinity-pagination-response.dto';
// // import { infinityPagination } from '@utils/infinity-pagination';

// // import { CountriesService } from './countries.service';
// // import { Country } from './domain/country';
// // import { QueryCountryDto } from './dto/query-country.dto';

// // @ApiTags('Countries')
// // @Controller()
// // export class CountriesController {
// //     constructor(private readonly countriesService: CountriesService) {}

// //     /***
// //      * Find all countries
// //      */

// //     @Get('v1/countries')
// //     @HttpCode(HttpStatus.OK)
// //     @ApiOkResponse({
// //         type: InfinityPaginationResponse(Country),
// //     })
// //     async findAll(
// //         @Query() query: QueryCountryDto
// //     ): Promise<InfinityPaginationResponseDto<Country>> {
// //         console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHA');
// //         const page = query?.page ?? 1;
// //         let limit = query?.limit ?? 10;
// //         if (limit > 50) {
// //             limit = 50;
// //         }

// //         return infinityPagination(
// //             await this.countriesService.findManyWithPagination({
// //                 filterOptions: query?.filters,
// //                 sortOptions: query?.sort,
// //                 paginationOptions: {
// //                     page,
// //                     limit,
// //                 },
// //             }),
// //             { page, limit }
// //         );
// //     }
// // }
