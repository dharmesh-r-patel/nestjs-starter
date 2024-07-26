import { Injectable } from '@nestjs/common';

import { PaginationService } from '@services/pagination.service';
import { UtilsService } from '@services/util.service';
import { PaginationResponseDto } from '@utils/dto/pagination-response.dto';
import { PaginationQueryDto } from '@utils/dto/pagination.dto';
import { IPaginationFieldConfig } from '@utils/types/pagination-options';

import { Country } from './dto/country';

/**
 * @fileoverview
 * This file defines the `CountriesService`, which handles the business logic for managing countries.
 *
 * @module
 * @description
 * The `CountriesService` is responsible for providing country-related services, including pagination and dynamic queries.
 */
@Injectable()
export class CountriesService {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly utilsService: UtilsService
    ) {}

    /**
     * Find all countries with pagination.
     *
     * @param {PaginationQueryDto} paginationQuery - The pagination query parameters.
     * @returns {Promise<PaginationResponseDto<Country>>} A promise that resolves to a paginated response of countries.
     *
     * @description
     * This method allows the client to retrieve a paginated list of countries based on the provided query parameters.
     * It dynamically builds SQL queries to select and count countries, and supports field configurations for joining additional tables.
     *
     * @example
     * ```typescript
     * const paginationQuery: PaginationQueryDto = {
     *   page: 1,
     *   limit: 10,
     *   sortBy: 'name',
     *   filter: { continent: 'Asia' },
     * };
     * const countries = await countriesService.findAll(paginationQuery);
     * ```
     *
     * @see PaginationQueryDto
     * @see PaginationResponseDto
     * @see Country
     */

    async findAll(paginationQuery: PaginationQueryDto): Promise<PaginationResponseDto<Country>> {
        const baseQuery = [
            'ptbl.id_country',
            'ptbl.name',
            'ptbl.iso',
            'ptbl.nice_name',
            'ptbl.iso3',
            'ptbl.num_code',
            'ptbl.dial_code',
            'ptbl.continent',
            'ptbl.capital',
        ];
        const fromQuery = ` FROM countries ptbl`;

        const fieldConfigs: Record<string, IPaginationFieldConfig> = {
            symbol: {
                joinTable: (alias: string) =>
                    `JOIN currencies ${alias} ON ${alias}.id_currency = ptlb.id_currency`,
                alias: () => `c${0}`, // Reusing the same alias logic for symbol and code
                selectFields: (alias: string) => [
                    `${alias}.symbol`,
                    `${alias}.name AS currency_name`,
                ],
            },
            offset: {
                joinTable: (alias: string) =>
                    `JOIN timezone ${alias} ON ${alias}.id_timezone = ptlb.id_timezone`,
                alias: () => `tz${0}`,
                selectFields: (alias: string) => [
                    `${alias}.value`,
                    `${alias}.offset`,
                    `${alias}.offset_in_minutes`,
                    `${alias}.text`,
                ],
            },
            abbr: {
                joinTable: (alias: string) =>
                    `JOIN timezone ${alias} ON ${alias}.id_timezone = ptlb.id_timezone`,
                alias: () => `tz${0}`,
                selectFields: (alias: string) => [`${alias}.abbr`],
            },
            code: {
                joinTable: (alias: string) =>
                    `JOIN currencies ${alias} ON ${alias}.id_currency = ptlb.id_currency`, // Reusing join logic for code
                alias: () => `c${0}`, // Reusing the same alias logic for symbol and code
                selectFields: (alias: string) => [`${alias}.code`],
            },
            // Add more field configurations as needed
        };

        const { selectQuery, countQuery } = this.utilsService.buildDynamicQuery(
            paginationQuery,
            fieldConfigs,
            baseQuery,
            fromQuery
        );

        // const select = selectFields.join(', ');
        return this.paginationService.paginate<Country>(selectQuery, countQuery, paginationQuery);

        // const { joinTables, selectFields, filterQuery, sortByQuery } =
        //     this.utilsService.buildDynamicQuery(paginationQuery, fieldConfigs);

        // console.log(
        //     'HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL selectFields',
        //     selectFields
        // );

        // // const selectQuery = `SELECT ${baseQuery.join(', ')} ${selectFields.join(', ')} ${fromQuery} ${joinTables.join(' ')} ${filterQuery} ${sortByQuery}`;
        // const selectQuery = `SELECT ${baseQuery.join(', ')} ${selectFields} ${fromQuery} ${joinTables.join(' ')} ${filterQuery} ${sortByQuery}`;
        // const countQuery = `SELECT count(*) ${fromQuery} ${joinTables.join(' ')} ${filterQuery}`;

        // // const select = selectFields.join(', ');
        // return this.paginationService.paginate<Country>(selectQuery, countQuery, paginationQuery);
    }
}

// start
// import { Injectable } from '@nestjs/common';

// import { PaginationService } from '@services/pagination.service';
// import { UtilsService } from '@services/util.service';
// import { PaginationResponseDto } from '@utils/dto/pagination-response.dto';
// import { PaginationQueryDto } from '@utils/dto/pagination.dto';
// import { IFieldConfig } from '@utils/types/pagination-options';
// // import { PaginationMetaDto } from '@utils/dto/pagination.meta.dto';

// import { Country } from './dto/country';

// @Injectable()
// export class CountriesService {
//     constructor(
//         private readonly paginationService: PaginationService,
//         private readonly utilsService: UtilsService
//     ) {}

//     async findAll(
//         paginationQuery: PaginationQueryDto<Country>
//     ): Promise<PaginationResponseDto<Country>> {
//         const baseQuery = [
//             'ptlb.id_country',
//             'ptlb.name',
//             'ptlb.iso',
//             'ptlb.nice_name',
//             'ptlb.iso3',
//             'ptlb.num_code',
//             'ptlb.dial_code',
//             'ptlb.continent',
//             'ptlb.capital',
//         ];
//         const fromQuery = ` FROM countries ptlb`;

//         // const joinTables = [];
//         // const whereClauses = [];

//         //     const baseQuery = `
//         //   SELECT
//         //     s.id,
//         //     s.name,
//         //     s.population,
//         //     s.area
//         // `;

//         //     const fromQuery = `
//         //   FROM
//         //     states s
//         // `;
//         //  let sortByQuery = '';

//         // const fieldConfigs: Record<string, IFieldConfig> = {
//         //     symbol: {
//         //         joinTable: (index: number) =>
//         //             `JOIN currencies c${0} ON c${0}.id_currency = ptlb.id_currency`,
//         //         alias: (index: number) => `c${0}`, // Reusing the same alias logic for symbol and code
//         //         selectFields: (alias: string) => [
//         //             `${alias}.symbol`,
//         //             `${alias}.name AS currency_name`,
//         //         ],
//         //     },
//         //     offset: {
//         //         joinTable: (index: number) =>
//         //             `JOIN timezone tz${index} ON tz${index}.id_timezone = ptlb.id_timezone`,
//         //         alias: (index: number) => `tz${index}`,
//         //         selectFields: (alias: string) => [
//         //             `${alias}.value`,
//         //             `${alias}.offset`,
//         //             `${alias}.offset_in_minutes`,
//         //             `${alias}.text`,
//         //         ],
//         //     },
//         //     code: {
//         //         joinTable: (index: number) =>
//         //             `JOIN currencies c${0} ON c${0}.id_currency = ptlb.id_currency`, // Reusing join logic for code
//         //         alias: (index: number) => `c${0}`, // Reusing the same alias logic for symbol and code
//         //         selectFields: (alias: string) => [`${alias}.code`],
//         //     },
//         //     // Add more field configurations as needed
//         // };

//         const fieldConfigs: Record<string, IFieldConfig> = {
//             symbol: {
//                 joinTable: (alias: string) =>
//                     `JOIN currencies ${alias} ON ${alias}.id_currency = ptlb.id_currency`,
//                 alias: () => `c${0}`, // Reusing the same alias logic for symbol and code
//                 selectFields: (alias: string) => [
//                     `${alias}.symbol`,
//                     `${alias}.name AS currency_name`,
//                 ],
//             },
//             offset: {
//                 joinTable: (alias: string) =>
//                     `JOIN timezone ${alias} ON ${alias}.id_timezone = ptlb.id_timezone`,
//                 alias: () => `tz${0}`,
//                 selectFields: (alias: string) => [
//                     `${alias}.value`,
//                     `${alias}.offset`,
//                     `${alias}.offset_in_minutes`,
//                     `${alias}.text`,
//                 ],
//             },
//             abbr: {
//                 joinTable: (alias: string) =>
//                     `JOIN timezone ${alias} ON ${alias}.id_timezone = ptlb.id_timezone`,
//                 alias: () => `tz${0}`,
//                 selectFields: (alias: string) => [`${alias}.abbr`],
//             },
//             code: {
//                 joinTable: (alias: string) =>
//                     `JOIN currencies ${alias} ON ${alias}.id_currency = ptlb.id_currency`, // Reusing join logic for code
//                 alias: () => `c${0}`, // Reusing the same alias logic for symbol and code
//                 selectFields: (alias: string) => [`${alias}.code`],
//             },
//             // Add more field configurations as needed
//         };

//         // const fieldConfigs: Record<string, IFieldConfig> = {
//         //     symbol: {
//         //         joinTable: (index: number) =>
//         //             `JOIN currencies c${index} ON c${index}.id_currency = s.currency_id`,
//         //         alias: (index: number) => `c${index}`,
//         //         selectFields: (alias: string) => [
//         //             `${alias}.symbol`,
//         //             `${alias}.name AS currency_name`,
//         //         ],
//         //     },
//         //     offset: {
//         //         joinTable: (index: number) =>
//         //             `JOIN timezone tz${index} ON tz${index}.id_timezone = s.timezone_id`,
//         //         alias: (index: number) => `tz${index}`,
//         //         selectFields: (alias: string) => [
//         //             `${alias}.value`,
//         //             `${alias}.offset`,
//         //             `${alias}.offset_in_minutes`,
//         //             `${alias}.text`,
//         //         ],
//         //     },
//         //     code: {
//         //         joinTable: (index: number) =>
//         //             `JOIN currencies c${index} ON c${index}.id_currency = s.currency_id`,
//         //         alias: (index: number) => `c${index}`,
//         //         selectFields: (alias: string) => [`${alias}.code`],
//         //     },
//         //     // Add more field configurations as needed
//         // };

//         // const { joinTables, selectFields, filterQuery, filterValues, sortByQuery } =
//         //     this.buildDynamicQuery(paginationQuery.filters, paginationQuery.sort, fieldConfigs);

//         // const finalSelectQuery = `SELECT ${baseQuery.join(', ')}, ${selectFields.join(', ')} ${fromQuery} ${joinTables.join(
//         //     ' '
//         // )} ${filterQuery} ${sortByQuery}`;

//         // const { joinTables, selectFields, filterQuery, sortByQuery } = this.buildDynamicQuery(
//         //     paginationQuery,
//         //     // paginationQuery.filters,
//         //     // paginationQuery.sort,
//         //     fieldConfigs
//         // );

//         const { joinTables, selectFields, filterQuery, sortByQuery } =
//             this.utilsService.buildDynamicQuery(
//                 paginationQuery,
//                 // paginationQuery.filters,
//                 // paginationQuery.sort,
//                 fieldConfigs
//             );

//         const finalSelectQuery = `SELECT ${baseQuery.join(', ')}, ${selectFields.join(', ')} ${fromQuery} ${joinTables.join(
//             ' '
//         )} ${filterQuery} ${sortByQuery}`;

//         console.log('BENCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', finalSelectQuery);

//         // let filterQuery = '';
//         // if (paginationQuery.filters && paginationQuery.filters.length > 0) {
//         //     const filterConditions = paginationQuery.filters
//         //         .map((filter, index) => {
//         //             const field = filter.field.toLowerCase();
//         //             let alias = ``;
//         //             if (field === 'symbol') {
//         //                 joinTables.push(
//         //                     ` JOIN currencies c${index} ON c.id_currency = c${index}.id_currency`
//         //                 );
//         //                 selectFields.push(`c${index}.symbol`, `c${index}.name AS currency_name`);
//         //                 alias = `c${index}`;
//         //             } else if (field === 'offset') {
//         //                 joinTables.push(
//         //                     ` JOIN timezone tz${index} ON c.id_timezone = tz${index}.id_timezone`
//         //                 );
//         //                 selectFields.push(
//         //                     `tz${index}.value`,
//         //                     `tz${index}.offset`,
//         //                     `tz${index}.offset_in_minutes`,
//         //                     `tz${index}.text`
//         //                 );
//         //                 alias = `tz${index}`;
//         //             } else {
//         //                 alias = `c${index}`;
//         //             }
//         //             const operator = filter.operator.toUpperCase();
//         //             if (operator === 'IN') {
//         //                 const values = filter.value
//         //                     .split(',')
//         //                     .map((val) => `'${val.trim()}'`)
//         //                     .join(', ');
//         //                 return ` ${alias}.${filter.field} IN (${values})`;
//         //             }
//         //             return ` ${alias}.${filter.field} ${filter.operator} '${filter.value}'`;
//         //         })
//         //         .join(' AND ');
//         //     filterQuery = `WHERE ${filterConditions}`;
//         // }

//         // console.log('____________________________________', joinTables);

//         // Add sort by clauses based on filters
//         // if (paginationQuery.sort) {
//         //     sortByQuery = ` order by `;
//         //     sortByQuery += paginationQuery.sort
//         //         .map((filter) => {
//         //             return `${filter.field} ${filter.direction}`;
//         //         })
//         //         .join(', ');
//         // }

//         // const select = selectFields.join(', ');
//         return this.paginationService.paginate<Country>(
//             selectFields,
//             `${fromQuery}`,
//             joinTables,
//             `${filterQuery}`,
//             sortByQuery,
//             paginationQuery
//         );
//     }

//     private buildDynamicQuery(
//         paginationQuery: any,
//         // filters: any | undefined,
//         // sort: any | undefined,
//         fieldConfigs: Record<string, IFieldConfig>
//     ) {
//         let filterQuery = '';
//         let sortByQuery = '';
//         const filterValues: any[] = [];
//         const joinTables: string[] = [];
//         const selectFields: string[] = [];

//         const filters = paginationQuery.filters;
//         const sort = paginationQuery.sort;

//         const mySet = new Set<string>();

//         if (filters && filters.length > 0) {
//             const filterConditions = filters
//                 .map(
//                     (filter: { field: string; operator: string; value: string }, index: number) => {
//                         const field = filter.field.toLowerCase();
//                         let alias = `ptlb`; // default alias for the main table
//                         if (fieldConfigs[field]) {
//                             const config = fieldConfigs[field];
//                             alias = config.alias(index);

//                             if (!mySet.has(alias)) {
//                                 mySet.add(alias);
//                                 // joinTables.push(config.joinTable(index));
//                                 joinTables.push(config.joinTable(alias));
//                             }
//                             selectFields.push(...config.selectFields(alias));
//                         }
//                         const operator = filter.operator.toUpperCase();
//                         if (operator === 'IN') {
//                             const values = filter.value.split(',').map((val) => `'${val.trim()}'`);
//                             return `${alias}.${filter.field} IN (${values.join(', ')})`;
//                         }
//                         // Add the value to the filterValues array for parameterized query
//                         filterValues.push(filter.value);
//                         // return `${alias}.${filter.field} ${filter.operator} ?`;
//                         return `${alias}.${filter.field} ${filter.operator} '${filter.value}'`;
//                     }
//                 )
//                 .join(' AND ');

//             filterQuery = `WHERE ${filterConditions}`;
//         }

//         if (sort && sort.length > 0) {
//             sortByQuery = `ORDER BY `;
//             sortByQuery += sort
//                 .map((sortItem: { field: string; direction: any }) => {
//                     const field = sortItem.field.toLowerCase();
//                     let alias = `ptlb`; // default alias for the main table

//                     if (fieldConfigs[field]) {
//                         const config = fieldConfigs[field];
//                         alias = config.alias(0); // Use index 0 since sorting doesn't require multiple aliases
//                     }

//                     return `${alias}.${sortItem.field} ${sortItem.direction}`;
//                 })
//                 .join(', ');
//         }

//         return { filterQuery, filterValues, joinTables, selectFields, sortByQuery };
//     }

//     // private buildDynamicQuery(
//     //     filters: any | undefined,
//     //     sort: any | undefined,
//     //     fieldConfigs: Record<string, IFieldConfig>
//     // ) {
//     //     let filterQuery = '';
//     //     let sortByQuery = '';
//     //     const filterValues: any[] = [];
//     //     const joinTables: string[] = [];
//     //     const selectFields: string[] = [];

//     //     if (filters && filters.length > 0) {
//     //         const filterConditions = filters
//     //             .map(
//     //                 (filter: { field: string; operator: string; value: string }, index: number) => {
//     //                     const field = filter.field.toLowerCase();
//     //                     let alias = `s`; // default alias for the main table

//     //                     if (fieldConfigs[field]) {
//     //                         const config = fieldConfigs[field];
//     //                         alias = config.alias(index);
//     //                         joinTables.push(config.joinTable(index));
//     //                         selectFields.push(...config.selectFields(alias));
//     //                     }

//     //                     const operator = filter.operator.toUpperCase();
//     //                     if (operator === 'IN') {
//     //                         const values = filter.value.split(',').map((val) => `'${val.trim()}'`);
//     //                         return `${alias}.${filter.field} IN (${values.join(', ')})`;
//     //                     }

//     //                     // Add the value to the filterValues array for parameterized query
//     //                     filterValues.push(filter.value);
//     //                     // return `${alias}.${filter.field} ${filter.operator} ?`;
//     //                     return `${alias}.${filter.field} ${filter.operator} '${filter.value}'`;
//     //                 }
//     //             )
//     //             .join(' AND ');

//     //         filterQuery = `WHERE ${filterConditions}`;
//     //     }

//     //     if (sort && sort.length > 0) {
//     //         sortByQuery = `ORDER BY `;
//     //         sortByQuery += sort
//     //             .map((sortItem) => {
//     //                 const field = sortItem.field.toLowerCase();
//     //                 let alias = `s`; // default alias for the main table

//     //                 if (fieldConfigs[field]) {
//     //                     const config = fieldConfigs[field];
//     //                     alias = config.alias(0); // Use index 0 since sorting doesn't require multiple aliases
//     //                 }

//     //                 return `${alias}.${sortItem.field} ${sortItem.direction}`;
//     //             })
//     //             .join(', ');
//     //     }

//     //     return { filterQuery, filterValues, joinTables, selectFields, sortByQuery };
//     // }
// }
// end
// import { Injectable } from '@nestjs/common';

// import { IPaginationOptions } from '@utils/types/pagination-options';

// import { Country } from './domain/country';
// import { FilterCountryDto, SortCountryDto } from './dto/query-country.dto';

// @Injectable()
// export class CountriesService {
//     findManyWithPagination({
//         filterOptions,
//         sortOptions,
//         paginationOptions,
//     }: {
//         filterOptions?: FilterCountryDto | null;
//         sortOptions?: SortCountryDto[] | null;
//         paginationOptions: IPaginationOptions;
//     }): Promise<Country[]> {
//         console.log('filterOptions', filterOptions);
//         console.log('sortOptions', sortOptions);
//         console.log('paginationOptions', paginationOptions);

//         return 'hi' as any;
//         // return this.usersRepository.findManyWithPagination({
//         //     filterOptions,
//         //     sortOptions,
//         //     paginationOptions,
//         // });
//     }
// }

// import { Injectable } from '@nestjs/common';

// import { PaginationService } from '@services/pagination.service';
// import { PaginationResponseDto } from '@utils/dto/pagination-response.dto';
// import { PaginationQueryDto } from '@utils/dto/pagination.dto';
// // import { PaginationMetaDto } from '@utils/dto/pagination.meta.dto';

// import { Country } from './dto/country';

// @Injectable()
// export class CountriesService {
//     constructor(private readonly paginationService: PaginationService) {}

//     async findAll(
//         paginationQuery: PaginationQueryDto<Country>
//     ): Promise<PaginationResponseDto<Country>> {
//         const selectFields = [
//             'c.id_country',
//             'c.name',
//             'c.iso',
//             'c.nice_name',
//             'c.iso3',
//             'c.num_code',
//             'c.dial_code',
//             'c.continent',
//             'c.capital',
//         ];
//         const fromQuery = ` FROM countries c`;

//         const joinTables = [];
//         // const whereClauses = [];
//         let sortByQuery = '';

//         let filterQuery = '';
//         if (paginationQuery.filters && paginationQuery.filters.length > 0) {
//             const filterConditions = paginationQuery.filters
//                 .map((filter, index) => {
//                     const field = filter.field.toLowerCase();
//                     let alias = ``;
//                     if (field === 'symbol') {
//                         joinTables.push(
//                             ` JOIN currencies c${index} ON c.id_currency = c${index}.id_currency`
//                         );
//                         selectFields.push(`c${index}.symbol`, `c${index}.name AS currency_name`);
//                         alias = `c${index}`;
//                     } else if (field === 'offset') {
//                         joinTables.push(
//                             ` JOIN timezone tz${index} ON c.id_timezone = tz${index}.id_timezone`
//                         );
//                         selectFields.push(
//                             `tz${index}.value`,
//                             `tz${index}.offset`,
//                             `tz${index}.offset_in_minutes`,
//                             `tz${index}.text`
//                         );
//                         alias = `tz${index}`;
//                     } else {
//                         alias = `c${index}`;
//                     }
//                     const operator = filter.operator.toUpperCase();
//                     if (operator === 'IN') {
//                         const values = filter.value
//                             .split(',')
//                             .map((val) => `'${val.trim()}'`)
//                             .join(', ');
//                         return ` ${alias}.${filter.field} IN (${values})`;
//                     }
//                     return ` ${alias}.${filter.field} ${filter.operator} '${filter.value}'`;
//                 })
//                 .join(' AND ');
//             filterQuery = `WHERE ${filterConditions}`;
//         }

//         // // Add join if filter by country_name
//         // paginationQuery.filters?.forEach((filter, index) => {
//         //     let alias = ``;
//         //     switch (filter.field) {
//         //         case 'symbol':
//         //             joinTables.push(
//         //                 ` JOIN currencies c${index} ON c.id_currency = c${index}.id_currency`
//         //             );
//         //             selectFields.push(`c${index}.symbol`, `c${index}.name AS currency_name`);
//         //             alias = `c${index}`;
//         //             // selectFields.push(`c${index}.name AS currency_name`);
//         //             break;
//         //         case 'offset':
//         //             joinTables.push(
//         //                 ` JOIN timezone tz${index} ON c.id_timezone = tz${index}.id_timezone`
//         //             );
//         //             selectFields.push(
//         //                 `tz${index}.value`,
//         //                 `tz${index}.offset`,
//         //                 `tz${index}.offset_in_minutes`,
//         //                 `tz${index}.text`
//         //             );
//         //             alias = `tz${index}`;
//         //             // selectFields.push(`tz${index}.offset`);
//         //             // selectFields.push(`tz${index}.offset_in_minutes`);
//         //             // selectFields.push(`tz${index}.text`);
//         //             break;
//         //         // Add more cases as needed for other filter fields
//         //         default:
//         //             alias = `c`;
//         //             // Handle other filter fields if needed
//         //             break;
//         //     }

//         //     if (filter.operator.toUpperCase() === 'IN') {
//         //         const values = filter.value
//         //             .split(',')
//         //             .map((val) => `'${val.trim()}'`)
//         //             .join(', ');
//         //         return ` ${alias}.${filter.field} IN (${values})`;
//         //     } else {
//         //         filterQuery += ` ${alias}.${filter.field} ${filter.operator} '${filter.value}'`;
//         //     }
//         // });

//         // Add where clauses based on filters
//         // if (paginationQuery.filters) {
//         //     paginationQuery.filters.forEach((filter) => {
//         //         switch (filter.operator) {
//         //             case 'LIKE':
//         //                 whereClauses.push(`${filter.field} LIKE '%${filter.value}%'`);
//         //                 break;
//         //             case '>':
//         //                 whereClauses.push(`${filter.field} > ${filter.value}`);
//         //                 break;
//         //             case '<':
//         //                 whereClauses.push(`${filter.field} < ${filter.value}`);
//         //                 break;
//         //             // Add other cases as needed
//         //         }
//         //     });
//         // }

//         // Add where clauses based on filters
//         // let filterQuery = '';
//         // if (paginationQuery.filters && paginationQuery.filters.length > 0) {
//         //     const filterConditions = paginationQuery.filters
//         //         .map((filter) => {
//         //             console.log('hi');
//         //             if (filter.operator.toUpperCase() === 'IN') {
//         //                 const values = filter.value
//         //                     .split(',')
//         //                     .map((val) => `'${val.trim()}'`)
//         //                     .join(', ');
//         //                 return `${filter.field} IN (${values})`;
//         //             }
//         //             return `${filter.field} ${filter.operator} '${filter.value}'`;
//         //         })
//         //         .join(' AND ');
//         //     filterQuery = `WHERE ${filterConditions}`;
//         // }
//         // let filterQuery = '';
//         // if (paginationQuery.filters && paginationQuery.filters.length > 0) {
//         //     const filterConditions = paginationQuery.filters
//         //         .map((filter) => {
//         //             const operator = filter.operator.toUpperCase();
//         //             if (operator === 'IN') {
//         //                 const values = filter.value
//         //                     .split(',')
//         //                     .map((val) => `'${val.trim()}'`)
//         //                     .join(', ');
//         //                 return `${filter.field} IN (${values})`;
//         //             }
//         //             return `${filter.field} ${filter.operator} '${filter.value}'`;
//         //         })
//         //         .join(' AND ');
//         //     filterQuery = `WHERE ${filterConditions}`;
//         // }

//         console.log('____________________________________', joinTables);

//         // Add sort by clauses based on filters
//         if (paginationQuery.sort) {
//             sortByQuery = ` order by `;
//             sortByQuery += paginationQuery.sort
//                 .map((filter) => {
//                     return `${filter.field} ${filter.direction}`;
//                 })
//                 .join(', ');
//         }

//         // const select = selectFields.join(', ');
//         return this.paginationService.paginate<Country>(
//             selectFields,
//             `${fromQuery}`,
//             joinTables,
//             `${filterQuery}`,
//             sortByQuery,
//             paginationQuery
//         );

//         // const data = [
//         //     { id_country: '1', name: 'Country 1' },
//         //     { id_country: '2', name: 'Country 2' },
//         // ];

//         // const meta = new PaginationMetaDto({
//         //     paginationQueryDto: paginationQuery,
//         //     totalItems: 77,
//         // });

//         // return { data, meta, hasNextPage: true };
//         // const baseQuery = `SELECT `;
//         // const selectFields = ['s.id', 's.name', 's.population', 's.area'];
//         // const fromQuery = ` FROM states s`;
//         // const countQuery = `SELECT COUNT(*)`;

//         // const joinTables = [];
//         // // if (paginationQuery.filters?.some((filter) => filter.field === 'country_name')) {
//         // //     joinTables.push('JOIN countries c ON s.country_id = c.id');
//         // //     selectFields.push('c.name as country_name');
//         // // }
//         // // Iterate over each filter in paginationQuery.filters
//         // // Iterate over each filter in paginationQuery.filters
//         // paginationQuery.filters?.forEach((filter, index) => {
//         //     switch (filter.field) {
//         //         case 'country_name':
//         //             joinTables.push(`JOIN countries c${index} ON s.country_id = c${index}.id`);
//         //             selectFields.push(`c${index}.name AS country_name`);
//         //             break;
//         //         case 'name':
//         //             joinTables.push(`JOIN state c${index} ON s.state_id = c${index}.id`);
//         //             selectFields.push(`c${index}.name AS state_name`);
//         //             break;
//         //         // Add more cases as needed for other filter fields
//         //         default:
//         //             // Handle other filter fields if needed
//         //             break;
//         //     }
//         // });

//         // // const select = selectFields.join(', ');
//         // return this.paginationService.paginate<Country>(
//         //     `${baseQuery} ${selectFields} ${fromQuery}`,
//         //     `${countQuery} ${fromQuery}`,
//         //     paginationQuery,
//         //     joinTables
//         // );
//     }
// }

// // import { Injectable } from '@nestjs/common';

// // import { IPaginationOptions } from '@utils/types/pagination-options';

// // import { Country } from './domain/country';
// // import { FilterCountryDto, SortCountryDto } from './dto/query-country.dto';

// // @Injectable()
// // export class CountriesService {
// //     findManyWithPagination({
// //         filterOptions,
// //         sortOptions,
// //         paginationOptions,
// //     }: {
// //         filterOptions?: FilterCountryDto | null;
// //         sortOptions?: SortCountryDto[] | null;
// //         paginationOptions: IPaginationOptions;
// //     }): Promise<Country[]> {
// //         console.log('filterOptions', filterOptions);
// //         console.log('sortOptions', sortOptions);
// //         console.log('paginationOptions', paginationOptions);

// //         return 'hi' as any;
// //         // return this.usersRepository.findManyWithPagination({
// //         //     filterOptions,
// //         //     sortOptions,
// //         //     paginationOptions,
// //         // });
// //     }
// // }
