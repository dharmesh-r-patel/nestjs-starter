import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { FileResponseDto } from './dto/file-response.dto';
import { FileUploadDto } from './dto/file.dto';
import { FilesS3PresignedService } from './files.service';

/**
 * @module FilesS3PresignedController
 *
 * @description
 * The `FilesS3PresignedController` manages HTTP requests for file operations involving Amazon S3 presigned URLs. It provides endpoints for uploading files and generating presigned URLs for downloading files from S3.
 *
 * @controllers
 * - `FilesS3PresignedController`: Handles file upload and presigned URL generation requests.
 */
@ApiTags('Files')
@Controller({
    path: 'files',
    version: '1',
})
export class FilesS3PresignedController {
    constructor(private readonly filesService: FilesS3PresignedService) {}

    /**
     * Uploads a file to Amazon S3.
     *
     * @param file - The file data to upload.
     * @returns A `FileResponseDto` object containing information about the uploaded file.
     *
     * @example
     * POST /files/v1/upload
     * Request body:
     * {
     *   "file": "base64-encoded-file-data"
     * }
     * Response:
     * {
     *   "file": {
     *     "path": "s3://bucket/path/to/file"
     *   }
     * }
     */

    @ApiCreatedResponse({
        type: FileResponseDto,
    })
    @Post('v1/upload')
    async uploadFile(@Body() file: FileUploadDto) {
        return this.filesService.create(file);
    }

    /**
     * Generates a presigned URL for downloading a file from Amazon S3.
     *
     * @param key - The key (path) of the file in the S3 bucket.
     * @param expiresIn - The expiration time for the presigned URL in seconds.
     * @returns An object containing the presigned URL for file download.
     *
     * @example
     * GET /files/v1/download/{key}?expiresIn=3600
     * Response:
     * {
     *   "url": "https://s3.amazonaws.com/bucket/path/to/file?signature"
     * }
     */

    @Get('v1/download/:key')
    async getDownloadUrl(@Param('key') key: string, @Query('expiresIn') expiresIn: number) {
        const url = await this.filesService.generatePresignedUrl(key, expiresIn);
        return { url };
    }
}
