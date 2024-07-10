import { Module } from '@nestjs/common';

import { ConfigService } from '../../common/helper/services/config.service';
import { FileDriver } from '../../core/enum/file.type';
import { IFileConfig } from '../../core/interfaces/file.interfaces';

import { FilesService } from './files.service';
import { FilesLocalModule } from './infrastructure/uploader/local/files.module';
import { FilesS3Module } from './infrastructure/uploader/s3/files.module';
import { FilesS3PresignedModule } from './infrastructure/uploader/s3-presigned/files.module';

const infrastructureUploaderModule =
    (new ConfigService().fileConfig as IFileConfig).driver === FileDriver.LOCAL
        ? FilesLocalModule
        : (new ConfigService().fileConfig as IFileConfig).driver === FileDriver.S3
          ? FilesS3Module
          : FilesS3PresignedModule;

@Module({
    imports: [infrastructureUploaderModule],
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule {}
