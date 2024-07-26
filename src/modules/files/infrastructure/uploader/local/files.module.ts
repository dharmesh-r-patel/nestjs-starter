import { Module } from '@nestjs/common';

import { FilesLocalController } from './files.controller';
import { FilesLocalService } from './files.service';

/**
 * @module FilesLocalModule
 *
 * @description
 * The `FilesLocalModule` is responsible for managing file operations using local storage.
 * It provides the necessary components to handle file uploads, retrievals, and other file-related operations specific to local storage.
 */
@Module({
    /**
     * The list of controllers that handle incoming requests and provide endpoints related to local file operations.
     */

    controllers: [FilesLocalController],

    /**
     * The list of providers that contain the business logic for file operations.
     * These providers are used to handle file-related tasks such as uploading, retrieving, and managing files.
     */

    providers: [FilesLocalService],

    /**
     * The list of providers that are made available for other modules to use.
     * `FilesLocalService` is exported so that other modules can utilize the service for local file operations.
     */
    exports: [FilesLocalService],
})
export class FilesLocalModule {}
