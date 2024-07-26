import { Type } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PaginationMetaDto } from '@utils/dto/pagination.meta.dto';

/**
 * DTO class for paginated responses.
 *
 * @export
 * @template T - Type of the data contained in the response.
 */

export class PaginationResponseDto<T> {
    /**
     * The array of paginated data.
     *
     * @type {T[]}
     * @memberof PaginationResponseDto
     */

    data: T[];

    /**
     * Metadata about the pagination.
     *
     * @type {PaginationMetaDto}
     * @memberof PaginationResponseDto
     */

    meta?: PaginationMetaDto;

    /**
     * Indicates if there is a next page available.
     *
     * @type {boolean}
     * @memberof PaginationResponseDto
     */

    has_next_page?: boolean;
}

/**
 * Creates a pagination response DTO class with specified data type.
 *
 * @export
 * @template T - Type of the data contained in the response.
 * @param {Type<T>} classReference - The class reference for the data type.
 * @returns {Type<any>} The class type of the pagination response DTO.
 */

export function PaginationResponse<T>(classReference: Type<T>) {
    abstract class Pagination {
        /**
         * The array of paginated data.
         *
         * @type {T[]}
         * @memberof Pagination
         */

        @ApiProperty({ type: [classReference] })
        readonly data!: T[];

        /**
         * Metadata about the pagination.
         *
         * @type {PaginationMetaDto}
         * @memberof Pagination
         */

        @ApiPropertyOptional({
            type: PaginationMetaDto,
            example: {
                totalItems: 77,
                currentPage: 1,
                pageSize: 10,
                totalPages: 8,
                startPage: 1,
                endPage: 8,
                startIndex: 0,
                endIndex: 76,
                pages: [1, 2, 3, 4, 5, 6, 7],
            },
            description:
                'When you pass `all` or `pagination` in the pagination query field, you will receive the meta field in the response.',
        })
        meta?: PaginationMetaDto;

        /**
         * Indicates if there is a next page available.
         *
         * @type {boolean}
         * @memberof Pagination
         */

        @ApiPropertyOptional({
            type: Boolean,
            example: true,
            description:
                'When you pass `all` or `infinity` in the pagination query field, you will receive the has_next_page field in the response.',
        })
        readonly has_next_page?: boolean;
    }

    Object.defineProperty(Pagination, 'name', {
        writable: false,
        value: `Pagination${classReference.name}ResponseDto`,
    });

    return Pagination;
}
