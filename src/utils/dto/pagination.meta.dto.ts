import { ApiPropertyOptional } from '@nestjs/swagger';

import { PaginationQueryDto } from '@utils/dto/pagination.dto';

export interface IPageMetaDtoParameters {
    paginationQueryDto: PaginationQueryDto;
    totalItems: number;
    maxPages?: number;
}

export class PaginationMetaDto {
    @ApiPropertyOptional({
        type: Number,
        example: 77, //  'Total records'
    })
    readonly totalItems: number;

    @ApiPropertyOptional({
        type: Number,
        example: 7, //  'Current page number',
    })
    readonly currentPage: number;

    @ApiPropertyOptional({
        type: Number,
        example: 10, //  'limit / page record number',
    })
    readonly pageSize: number;

    @ApiPropertyOptional({
        type: Number,
        example: 8, //  'Total pages',
    })
    readonly totalPages: number;

    @ApiPropertyOptional({
        type: Number,
        example: 1, //  'Start page',
    })
    readonly startPage: number;

    @ApiPropertyOptional({
        type: Number,
        example: 7, //  'End page',
    })
    readonly endPage: number;

    @ApiPropertyOptional({
        type: Number,
        example: 0, //  'Record start index',
    })
    readonly startIndex: number;

    @ApiPropertyOptional({
        type: Number,
        example: 76, //  'Record end index',
    })
    readonly endIndex: number;

    @ApiPropertyOptional({
        type: Array,
        example: [1, 2, 3, 4, 5, 6, 7], //  'Array of page number',
    })
    readonly pages: any;

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
