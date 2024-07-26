import { ApiResponseProperty } from '@nestjs/swagger';

import { FileType } from '../../../../domain/file';

/**
 * @dto FileResponseDto
 *
 * @description
 * Data transfer object (DTO) for representing the response format when returning file metadata. This DTO is used to encapsulate the file's information in API responses.
 *
 * @properties
 *
 * @property {FileType} file - Represents the metadata of the uploaded file, including its path and any other relevant information.
 *
 * @decorators
 * - `@ApiResponseProperty()`: Marks the property for inclusion in Swagger API documentation.
 */
export class FileResponseDto {
    /**
     * Represents the metadata of the uploaded file.
     *
     * @type {FileType}
     * @description Contains details about the file, such as its path and identifier.
     * @example
     * {
     *     "id": "cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae",
     *     "path": "https://example.com/path/to/file.jpg"
     * }
     */

    @ApiResponseProperty({
        type: () => FileType,
    })
    file: FileType;
}
