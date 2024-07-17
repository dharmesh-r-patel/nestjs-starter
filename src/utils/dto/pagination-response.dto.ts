import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { PaginationMetaDto } from '@utils/dto/pagination.meta.dto';

export class PaginationResponseDto<T> {
    data: T[];
    meta?: PaginationMetaDto;
    has_next_page?: boolean;
}

export function PaginationResponse<T>(classReference: Type<T>) {
    abstract class Pagination {
        @ApiResponseProperty({ type: [classReference] })
        readonly data!: T[];

        @ApiResponseProperty({
            type: Object,
            example: { name: 'dharmesh' },
        })
        readonly meta?: PaginationMetaDto;

        @ApiResponseProperty({
            type: Boolean,
            example: true,
        })
        readonly has_next_page?: boolean;
    }

    Object.defineProperty(Pagination, 'name', {
        writable: false,
        value: `Pagination${classReference.name}ResponseDto`,
    });

    return Pagination;
}
