import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { FileResponseDto } from './dto/file-response.dto';
import { FileUploadDto } from './dto/file.dto';
import { FilesS3PresignedService } from './files.service';

@ApiTags('Files')
@Controller({
    path: 'files',
    version: '1',
})
export class FilesS3PresignedController {
    constructor(private readonly filesService: FilesS3PresignedService) {}

    @ApiCreatedResponse({
        type: FileResponseDto,
    })
    @Post('v1/upload')
    async uploadFile(@Body() file: FileUploadDto) {
        return this.filesService.create(file);
    }

    @Get('v1/download/:key')
    async getDownloadUrl(@Param('key') key: string, @Query('expiresIn') expiresIn: number) {
        const url = await this.filesService.generatePresignedUrl(key, expiresIn);
        return { url };
    }
}
