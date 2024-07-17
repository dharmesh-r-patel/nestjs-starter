import { Injectable } from '@nestjs/common';

import { PaginationService } from '@services/pagination.service';
import { PaginationResponseDto } from '@utils/dto/pagination-response.dto';
import { PaginationQueryDto } from '@utils/dto/pagination.dto';
// import { PaginationMetaDto } from '@utils/dto/pagination.meta.dto';

import { Country } from './dto/country';

@Injectable()
export class CountriesService {
    constructor(private readonly paginationService: PaginationService) {}

    async findAll(
        paginationQuery: PaginationQueryDto<Country>
    ): Promise<PaginationResponseDto<Country>> {
        const selectFields = [
            'id_country',
            'name',
            'iso',
            'nice_name',
            'iso3',
            'num_code',
            'dial_code',
            'continent',
            'capital',
        ];
        const fromQuery = ` FROM countries`;

        const joinTables = [];
        const whereClauses = [];
        let sortByQuery = '';

        // Add join if filter by country_name
        paginationQuery.filters?.forEach((filter, index) => {
            switch (filter.field) {
                case 'country_name':
                    joinTables.push(`JOIN countries c${index} ON s.country_id = c${index}.id`);
                    selectFields.push(`c${index}.name AS country_name`);
                    break;
                case 'name':
                    joinTables.push(`JOIN state c${index} ON s.state_id = c${index}.id`);
                    selectFields.push(`c${index}.name AS state_name`);
                    break;
                // Add more cases as needed for other filter fields
                default:
                    // Handle other filter fields if needed
                    break;
            }
        });

        // Add where clauses based on filters
        if (paginationQuery.filters) {
            paginationQuery.filters.forEach((filter) => {
                switch (filter.operator) {
                    case 'LIKE':
                        whereClauses.push(`${filter.field} LIKE '%${filter.value}%'`);
                        break;
                    case '>':
                        whereClauses.push(`${filter.field} > ${filter.value}`);
                        break;
                    case '<':
                        whereClauses.push(`${filter.field} < ${filter.value}`);
                        break;
                    // Add other cases as needed
                }
            });
        }

        // Add sort by clauses based on filters
        if (paginationQuery.sort) {
            sortByQuery = ` order by `;
            sortByQuery += paginationQuery.sort
                .map((filter) => {
                    return `${filter.field} ${filter.direction}`;
                })
                .join(', ');
        }

        // const select = selectFields.join(', ');
        return this.paginationService.paginate<Country>(
            selectFields,
            `${fromQuery}`,
            joinTables,
            whereClauses,
            sortByQuery,
            paginationQuery
        );

        // const data = [
        //     { id_country: '1', name: 'Country 1' },
        //     { id_country: '2', name: 'Country 2' },
        // ];

        // const meta = new PaginationMetaDto({
        //     paginationQueryDto: paginationQuery,
        //     totalItems: 77,
        // });

        // return { data, meta, hasNextPage: true };
        // const baseQuery = `SELECT `;
        // const selectFields = ['s.id', 's.name', 's.population', 's.area'];
        // const fromQuery = ` FROM states s`;
        // const countQuery = `SELECT COUNT(*)`;

        // const joinTables = [];
        // // if (paginationQuery.filters?.some((filter) => filter.field === 'country_name')) {
        // //     joinTables.push('JOIN countries c ON s.country_id = c.id');
        // //     selectFields.push('c.name as country_name');
        // // }
        // // Iterate over each filter in paginationQuery.filters
        // // Iterate over each filter in paginationQuery.filters
        // paginationQuery.filters?.forEach((filter, index) => {
        //     switch (filter.field) {
        //         case 'country_name':
        //             joinTables.push(`JOIN countries c${index} ON s.country_id = c${index}.id`);
        //             selectFields.push(`c${index}.name AS country_name`);
        //             break;
        //         case 'name':
        //             joinTables.push(`JOIN state c${index} ON s.state_id = c${index}.id`);
        //             selectFields.push(`c${index}.name AS state_name`);
        //             break;
        //         // Add more cases as needed for other filter fields
        //         default:
        //             // Handle other filter fields if needed
        //             break;
        //     }
        // });

        // // const select = selectFields.join(', ');
        // return this.paginationService.paginate<Country>(
        //     `${baseQuery} ${selectFields} ${fromQuery}`,
        //     `${countQuery} ${fromQuery}`,
        //     paginationQuery,
        //     joinTables
        // );
    }
}

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
