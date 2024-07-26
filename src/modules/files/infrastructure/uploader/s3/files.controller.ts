import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

// import { ApiFile } from '../../../../../decorators/swagger.schema';
import { ApiFile } from '@decorators/swagger.schema';

import { FileResponseDto } from './dto/file-response.dto';
import { FilesS3Service } from './files.service';

/**
 * @controller FilesS3Controller
 *
 * @description
 * The `FilesS3Controller` handles HTTP requests related to file uploads using AWS S3. It provides an endpoint for uploading files to S3 and returning the file metadata.
 *
 * @tags
 * - Files: Grouped under the 'Files' tag for API documentation purposes.
 *
 * @path
 * - `files`: Base path for file-related operations.
 * - `v1/upload/s3`: Endpoint for file uploads to S3.
 *
 * @controller
 *
 * @constructor
 * @param {FilesS3Service} filesService - Service responsible for handling file operations with S3.
 *
 * @methods
 *
 * @method uploadFile
 * @description
 * Handles file upload requests. Files are processed and uploaded to S3. The response includes metadata about the uploaded file.
 *
 * @param {Express.MulterS3.File} file - The uploaded file from the request.
 * @returns {Promise<FileResponseDto>} - A promise that resolves to the file metadata.
 *
 * @decorators
 * - `@ApiTags('Files')`: Tags the controller with 'Files' for API documentation.
 * - `@ApiCreatedResponse({ type: FileResponseDto })`: Specifies the response type for successful file uploads.
 * - `@Post('v1/upload/s3')`: Defines the HTTP POST endpoint for file uploads.
 * - `@ApiConsumes('multipart/form-data')`: Indicates that the endpoint consumes 'multipart/form-data' for file uploads.
 * - `@ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })`: Documents the expected request body schema for file uploads.
 * - `@ApiFile()`: Custom decorator for file upload handling.
 * - `@UseInterceptors(FileInterceptor('file'))`: Applies the `FileInterceptor` to handle file uploads.
 */

@ApiTags('Files')
@Controller({
    path: 'files',
    version: '1',
})
export class FilesS3Controller {
    constructor(private readonly filesService: FilesS3Service) {}

    @ApiCreatedResponse({
        type: FileResponseDto,
    })
    @Post('v1/upload/s3')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiFile()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.MulterS3.File): Promise<FileResponseDto> {
        return this.filesService.create(file);
    }
}
