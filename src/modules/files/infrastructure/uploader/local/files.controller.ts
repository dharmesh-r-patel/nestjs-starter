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

import { ApiFile } from '../../../../../decorators/swagger.schema';
import {
    filesRoot,
    editFileName,
    imageFileFilter,
} from '../../../../../providers/file-upload.service';

import { FileResponseDto } from './dto/file-response.dto';
import { FilesLocalService } from './files.service';

@ApiTags('Files')
@Controller()
export class FilesLocalController {
    constructor(private readonly filesService: FilesLocalService) {}

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

    @Get(':path')
    @ApiExcludeEndpoint()
    download(@Param('path') path, @Response() response) {
        return response.sendFile(path, { root: filesRoot() + '/local' });
    }
}
