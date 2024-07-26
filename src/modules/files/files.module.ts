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

/**
 * @fileoverview
 * This file defines the `FilesModule`, which is responsible for managing file uploads
 * through different infrastructure modules. It conditionally imports the appropriate
 * file uploader module based on configuration settings.
 *
 * @module
 * @description
 * The `FilesModule` class integrates various file uploader modules and provides
 * the `FilesService` for handling file operations. The module configuration allows
 * switching between different file storage solutions such as local storage, S3, and
 * S3 presigned uploads.
 */

@Module({
    /**
     * The `imports` array specifies the modules that are imported into this module.
     * The choice of uploader module is determined based on the configuration settings.
     */

    imports: [infrastructureUploaderModule, FilesS3Module, FilesS3PresignedModule],

    /**
     * The `providers` array defines the providers that are instantiated by this module.
     * The `FilesService` is included here to be used within this module.
     */

    providers: [FilesService],

    /**
     * The `exports` array specifies the providers that are exported from this module.
     * The `FilesService` is exported so it can be used by other modules.
     */

    exports: [FilesService],
})
export class FilesModule {}
