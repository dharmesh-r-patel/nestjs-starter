import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';

import { FileType } from '../../../domain/file';

/**
 * @service FilesS3Service
 *
 * @description
 * The `FilesS3Service` provides methods for handling file operations with AWS S3. It includes functionality to process uploaded files and return their metadata.
 *
 * @constructor
 * @param {void} - No parameters are injected into the constructor.
 *
 * @methods
 *
 * @method create
 * @description
 * Handles the creation and metadata retrieval for uploaded files. It validates the presence of the file and returns its metadata.
 *
 * @param {Express.MulterS3.File} file - The uploaded file from the request. It should include information such as the file's S3 key.
 * @returns {Promise<{ file: FileType }>} - A promise that resolves to an object containing the file metadata.
 *
 * @throws {UnprocessableEntityException} - Throws an exception if the file is not provided in the request.
 *
 * @decorators
 * - `@Injectable()`: Marks the class as a provider that can be injected into other components.
 */
@Injectable()
export class FilesS3Service {
    constructor() {}

    /**
     * Handles the creation and metadata retrieval for uploaded files.
     *
     * @param {Express.MulterS3.File} file - The uploaded file from the request.
     * @returns {Promise<{ file: FileType }>} - A promise that resolves to an object containing the file metadata.
     * @throws {UnprocessableEntityException} - Throws an exception if the file is not provided.
     */

    async create(file: Express.MulterS3.File): Promise<{ file: FileType }> {
        if (!file) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    file: 'selectFile',
                },
            });
        }

        return {
            file: {
                path: file.key,
            } as any,
        };
    }
}
