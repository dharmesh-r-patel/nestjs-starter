import { ApiResponseProperty } from '@nestjs/swagger';

import { FileType } from '../../../../domain/file';

/**
 * @class FileResponseDto
 *
 * @description
 * The `FileResponseDto` class represents the response structure for file operations, including the file metadata and upload signed URL. This DTO is used to standardize the response format for file upload operations.
 */

export class FileResponseDto {
    /**
     * The metadata of the file, including its path and other relevant information.
     *
     * @type {FileType}
     * @example
     * {
     *   id: 'abc123',
     *   path: '/files/example.jpg'
     * }
     */

    @ApiResponseProperty({
        type: () => FileType,
    })
    file: FileType;

    /**
     * The presigned URL for uploading the file to the server or cloud storage.
     * This URL is used to securely upload the file to the specified location.
     *
     * @type {string}
     * @example
     * 'https://example-bucket.s3.amazonaws.com/unique-file-key?AWSAccessKeyId=ACCESS_KEY&Expires=EXPIRATION_TIME&Signature=SIGNATURE'
     */

    @ApiResponseProperty({
        type: String,
    })
    uploadSignedUrl: string;
}
