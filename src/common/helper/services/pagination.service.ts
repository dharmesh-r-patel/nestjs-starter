import { Injectable } from '@nestjs/common';

import { PrismaService } from '@services/prisma.service';
import { PaginationResponseDto } from '@utils/dto/pagination-response.dto';
import { PaginationQueryDto } from '@utils/dto/pagination.dto';
import { PaginationMetaDto } from '@utils/dto/pagination.meta.dto';

/**
 * @service PaginationService
 *
 * @description
 * The `PaginationService` provides functionality to handle pagination for database queries. It utilizes Prisma's query capabilities
 * to perform paginated data retrieval based on the provided query parameters.
 *
 * @remarks
 * - The `paginate` method constructs SQL queries to fetch paginated data and its corresponding metadata.
 * - The method supports different pagination strategies such as 'all' and 'infinity'.
 *
 * @example
 * ```typescript
 * const paginationQuery = new PaginationQueryDto({
 *     page: 1,
 *     limit: 10,
 *     pagination: 'paginate',
 * });
 *
 * const result = await paginationService.paginate<MyEntity>(
 *     'SELECT * FROM my_table',
 *     'SELECT COUNT(*) as count FROM my_table',
 *     paginationQuery
 * );
 * ```
 */

@Injectable()
export class PaginationService {
    constructor(private readonly prisma: PrismaService) {}

    async paginate<T>(
        selectQuery: string,
        countQuery: string,
        paginationQuery: PaginationQueryDto
    ): Promise<PaginationResponseDto<T>> {
        const { page, limit, pagination } = paginationQuery;

        const offset = (page - 1) * limit;

        const dataQuery = `${selectQuery} LIMIT ${limit} OFFSET ${offset}`;

        const metaPage = pagination === 'all' || pagination === 'paginate';

        // const [data, total] = await this.prisma.$transaction([
        //     this.prisma.$queryRawUnsafe<T[]>(dataQuery),
        //     this.prisma.$queryRawUnsafe<{ count: number }[]>(countQuery),
        // ]);

        // console.log('DATTTTTTTTTTTTTTTTTTTTTTTTT', dataQuery);

        const [data, total] = await Promise.all([
            this.prisma.$queryRawUnsafe<T[]>(dataQuery),
            metaPage
                ? this.prisma.$queryRawUnsafe<{ count: number }[]>(countQuery)
                : [{ count: 0 }],
        ]);

        // console.log('DATTTTTTTTTTTTTTTTTTTTTTTTT', total, total[0]);

        const meta = metaPage
            ? new PaginationMetaDto({
                  paginationQueryDto: paginationQuery,
                  totalItems: Number(total[0].count),
              })
            : undefined;

        const has_next_page =
            pagination === 'all' || pagination === 'infinity' ? data.length === limit : undefined;

        return {
            data,
            meta,
            has_next_page,
        };
    }
}

// start
// import { Injectable } from '@nestjs/common';

// import { PrismaService } from '@services/prisma.service';
// import { PaginationResponseDto } from '@utils/dto/pagination-response.dto';
// import { PaginationQueryDto } from '@utils/dto/pagination.dto';
// import { PaginationMetaDto } from '@utils/dto/pagination.meta.dto';
// import { IFieldConfig } from '@utils/types/pagination-options';

// @Injectable()
// export class PaginationService {
//     constructor(private readonly prisma: PrismaService) {}

//     async paginate<T>(
//         selectFields: string[],
//         fromQuery: string,
//         joinTables: string[] = [],
//         filterQuery: string,
//         sortByQuery: string,
//         paginationQuery: PaginationQueryDto<T>
//     ): Promise<PaginationResponseDto<T>> {
//         const { page, limit, filters, pagination } = paginationQuery;

//         // console.log('Hiii pagination service', page);

//         // console.log('Hiii selectFields', selectFields);
//         // console.log('Hiii fromQuery', fromQuery);
//         // console.log('Hiii joinTables', joinTables);
//         // console.log('Hiii whereClauses', filterQuery);

//         // console.log('Hiii paginationQuery', paginationQuery);

//         // console.log('Hiii paginationQuery---------------------------------', pagination === 'all');

//         const offset = (page - 1) * limit;
//         const select = selectFields.join(', ');

//         const joinQuery = joinTables.join(' ');

//         // const filterQuery = '';
//         // if (filters && filters.length > 0) {
//         //     const filterConditions = filters
//         //         .map((filter) => {
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

//         // console.log('____________________________________', filterQuery);

//         const dataQuery = `SELECT ${select} ${fromQuery} ${joinQuery} ${filterQuery} ${sortByQuery} LIMIT ${limit} OFFSET ${offset}`;
//         const countQuery = `SELECT count(*) ${fromQuery} ${joinQuery} ${filterQuery}`;

//         // console.log('____________________________________', dataQuery);
//         // console.log('____________________________________', countQuery);

//         const metaPage = pagination === 'all' || pagination === 'paginate';

//         // const [data, total] = await this.prisma.$transaction([
//         //     this.prisma.$queryRawUnsafe<T[]>(dataQuery),
//         //     this.prisma.$queryRawUnsafe<{ count: number }[]>(countQuery),
//         // ]);

//         const [data, total] = await Promise.all([
//             this.prisma.$queryRawUnsafe<T[]>(dataQuery),
//             metaPage
//                 ? this.prisma.$queryRawUnsafe<{ count: number }[]>(countQuery)
//                 : [{ count: 0 }],
//         ]);

//         // console.log('DATTTTTTTTTTTTTTTTTTTTTTTTT', total, total[0]);

//         const meta = metaPage
//             ? new PaginationMetaDto({
//                   paginationQueryDto: paginationQuery,
//                   totalItems: Number(total[0].count),
//               })
//             : undefined;

//         const has_next_page =
//             pagination === 'all' || pagination === 'infinity' ? data.length === limit : undefined;

//         return {
//             data,
//             meta,
//             has_next_page,
//         };

//         // const dataQuery = `SELECT ${select} ${joinQuery} ${filterQuery} ${sortQuery} LIMIT ${limit} OFFSET ${offset}`;

//         return 'hi' as any;
//         // const offset = (page - 1) * limit;
//         // // const select = selectFields.join(', ');

//         // let filterQuery = '';
//         // if (filters && filters.length > 0) {
//         //     const filterConditions = filters
//         //         .map((filter) => {
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

//         // let sortQuery = '';
//         // // if (sort) {
//         // //     const sortConditions = sort
//         // //         .split(',')
//         // //         .map((s) => s.trim())
//         // //         .join(', ');
//         // //     sortQuery = `ORDER BY ${sortConditions}`;
//         // // }

//         // const joinQuery = joinTables.join(' ');

//         // const dataQuery = `${baseQuery} ${joinQuery} ${filterQuery} ${sortQuery} LIMIT ${limit} OFFSET ${offset}`;
//         // const countFilterQuery = filterQuery ? filterQuery : '';
//         // const finalCountQuery = `${countQuery} ${joinQuery} ${countFilterQuery}`;
//         // console.log('DATA QUERY', dataQuery);
//         // console.log('finalCountQuery QUERY', finalCountQuery);
//         // console.log(offset, select, filters, sort, filterQuery, sortQuery, joinQuery);
//         return 'x' as any;
//         // const [data, total] = await this.prisma.$transaction([
//         //     this.prisma.$queryRawUnsafe<T[]>(dataQuery),
//         //     this.prisma.$queryRawUnsafe<{ count: number }[]>(finalCountQuery),
//         // ]);
//         // return {
//         //     data,
//         //     total: total[0].count,
//         //     page,
//         //     limit,
//         // };
//     }
// }
// end
