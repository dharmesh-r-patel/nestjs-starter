import {
    Controller,
    Get,
    Param,
    Post,
    Response,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiExcludeEndpoint,
    ApiTags,
} from '@nestjs/swagger';

import { diskStorage } from 'multer';

// import { ApiFile } from '@decorators/swagger.schema';
import { ApiFile } from '@decorators/swagger.schema';
import { filesRoot, editFileName, imageFileFilter } from '@providers/file-upload.service';

import { FileResponseDto } from './dto/file-response.dto';
import { FilesLocalService } from './files.service';

/**
 * @controller FilesLocalController
 *
 * @description
 * The `FilesLocalController` is responsible for handling file operations related to local storage.
 * It provides endpoints for uploading and downloading files.
 */

@ApiTags('Files')
@Controller()
export class FilesLocalController {
    constructor(private readonly filesService: FilesLocalService) {}

    /**
     * Uploads a file to local storage.
     *
     * @endpoint POST /v1/upload
     * @consumes multipart/form-data
     *
     * @param file The file to be uploaded.
     * @returns FileResponseDto The response containing file details after upload.
     *
     * @throws { HttpException } If there is an error during file upload.
     */

    @ApiCreatedResponse({
        type: FileResponseDto,
    })
    @Post('v1/upload')
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
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: filesRoot() + '/local',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        })
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileResponseDto> {
        return this.filesService.create(file);
    }

    /**
     * Downloads a file from local storage.
     *
     * @endpoint GET /:path
     *
     * @param path The path to the file to be downloaded.
     * @returns A file response stream.
     *
     * @throws { HttpException } If the file cannot be found or there is an error during download.
     */

    @Get(':path')
    @ApiExcludeEndpoint()
    download(@Param('path') path, @Response() response) {
        return response.sendFile(path, { root: filesRoot() + '/local' });
    }
}
