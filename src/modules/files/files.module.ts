import { Module } from '@nestjs/common';

import { FilesService } from './files.service';
import { FilesLocalModule } from './infrastructure/uploader/local/files.module';
import { FilesS3Module } from './infrastructure/uploader/s3/files.module';
import { FilesS3PresignedModule } from './infrastructure/uploader/s3-presigned/files.module';

// import { InfrastructureUploaderModule } from './infrastructureUploaderModule';

// const infrastructureUploaderModule =
//     (fileConfig() as FileConfig).driver === FileDriver.LOCAL
//         ? FilesLocalModule
//         : (fileConfig() as FileConfig).driver === FileDriver.S3
//           ? FilesS3Module
//           : FilesS3PresignedModule;

// console.log(
//     '********************************************************************===============================',
//     fileConfig() as FileConfig
// );

const infrastructureUploaderModule = FilesLocalModule;

@Module({
    imports: [infrastructureUploaderModule, FilesS3Module, FilesS3PresignedModule],
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule {}
