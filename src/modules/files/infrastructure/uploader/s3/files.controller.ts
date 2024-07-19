import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

// import { ApiFile } from '../../../../../decorators/swagger.schema';
import { ApiFile } from '@decorators/swagger.schema';

import { FileResponseDto } from './dto/file-response.dto';
import { FilesS3Service } from './files.service';

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
