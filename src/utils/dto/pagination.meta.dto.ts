import { ApiPropertyOptional } from '@nestjs/swagger';

import { PaginationQueryDto } from '@utils/dto/pagination.dto';

export interface IPageMetaDtoParameters {
    paginationQueryDto: PaginationQueryDto;
    totalItems: number;
    maxPages?: number;
}

/**
 * PaginationMetaDto provides metadata for paginated responses.
 * This class helps in constructing the pagination information that can be used
 * to navigate through large sets of data.
 *
 * @example
 * {
 *   totalItems: 77,
 *   currentPage: 7,
 *   pageSize: 10,
 *   totalPages: 8,
 *   startPage: 1,
 *   endPage: 7,
 *   startIndex: 60,
 *   endIndex: 76,
 *   pages: [1, 2, 3, 4, 5, 6, 7]
 * }
 */

export class PaginationMetaDto {
    /**
     * The total number of items available.
     *
     * @example 77
     */

    @ApiPropertyOptional({
        type: Number,
        example: 77, //  'Total records'
    })
    readonly totalItems: number;

    /**
     * The current page number.
     *
     * @example 7
     */

    @ApiPropertyOptional({
        type: Number,
        example: 7, //  'Current page number',
    })
    readonly currentPage: number;

    /**
     * The number of items per page (page size).
     *
     * @example 10
     */

    @ApiPropertyOptional({
        type: Number,
        example: 10, //  'limit / page record number',
    })
    readonly pageSize: number;

    /**
     * The total number of pages based on total items and page size.
     *
     * @example 8
     */

    @ApiPropertyOptional({
        type: Number,
        example: 8, //  'Total pages',
    })
    readonly totalPages: number;

    /**
     * The start page in the pagination controls.
     *
     * @example 1
     */

    @ApiPropertyOptional({
        type: Number,
        example: 1, //  'Start page',
    })
    readonly startPage: number;

    /**
     * The end page in the pagination controls.
     *
     * @example 7
     */

    @ApiPropertyOptional({
        type: Number,
        example: 7, //  'End page',
    })
    readonly endPage: number;

    /**
     * The index of the first item on the current page.
     *
     * @example 60
     */

    @ApiPropertyOptional({
        type: Number,
        example: 0, //  'Record start index',
    })
    readonly startIndex: number;

    /**
     * The index of the last item on the current page.
     *
     * @example 76
     */

    @ApiPropertyOptional({
        type: Number,
        example: 76, //  'Record end index',
    })
    readonly endIndex: number;

    /**
     * An array of page numbers to display in pagination controls.
     *
     * @example [1, 2, 3, 4, 5, 6, 7]
     */

    @ApiPropertyOptional({
        type: Array,
        example: [1, 2, 3, 4, 5, 6, 7], //  'Array of page number',
    })
    readonly pages: any;

    /**
     * Creates an instance of PaginationMetaDto.
     *
     * @param {IPageMetaDtoParameters} params - Parameters required for creating pagination metadata.
     */

    constructor({ paginationQueryDto, totalItems, maxPages = 10 }: IPageMetaDtoParameters) {
        const pageSize = paginationQueryDto.limit || 10;
        let currentPage = paginationQueryDto.page || 1;

        // calculate total pages

        const totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;

        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.startPage = startPage;
        this.endPage = endPage;
        this.startIndex = startIndex > 0 ? startIndex : 0;
        this.endIndex = endIndex > 0 ? endIndex : 0;
        this.pages = pages;
    }
}
