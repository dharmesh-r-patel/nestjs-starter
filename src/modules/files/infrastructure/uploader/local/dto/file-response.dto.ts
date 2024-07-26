import { ApiResponseProperty } from '@nestjs/swagger';

import { FileType } from '../../../../domain/file';

/**
 * @dto FileResponseDto
 *
 * @description
 * The `FileResponseDto` represents the response object returned when a file is successfully uploaded or processed.
 */
export class FileResponseDto {
    /**
     * The file details.
     *
     * @type {FileType}
     *
     * @example
     * {
     *   id: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
     *   path: '/api/v1/uploads/example-file.jpg'
     * }
     */

    @ApiResponseProperty({
        type: () => FileType,
    })
    file: FileType;
}
