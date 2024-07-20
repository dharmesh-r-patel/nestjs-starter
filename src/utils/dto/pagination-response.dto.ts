import { Type } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PaginationMetaDto } from '@utils/dto/pagination.meta.dto';

export class PaginationResponseDto<T> {
    data: T[];
    meta?: PaginationMetaDto;
    has_next_page?: boolean;
}

export function PaginationResponse<T>(classReference: Type<T>) {
    abstract class Pagination {
        @ApiProperty({ type: [classReference] })
        readonly data!: T[];

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
