import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';

/**
 * @class FileUploadDto
 *
 * @description
 * The `FileUploadDto` class defines the data transfer object for uploading files. It includes properties to specify the file's name and size. This DTO is used to validate and document the data required for file upload operations.
 */

export class FileUploadDto {
    /**
     * The name of the file to be uploaded.
     *
     * @type {string}
     * @example
     * 'image.jpg'
     */

    @ApiProperty({ example: 'image.jpg' })
    @IsString()
    fileName: string;

    /**
     * The size of the file in bytes.
     *
     * @type {number}
     * @example
     * 138723
     */

    @ApiProperty({ example: 138723 })
    @IsNumber()
    fileSize: number;
}
