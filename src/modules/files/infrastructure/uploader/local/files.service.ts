import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AllConfigType } from '@config/type/config.type';

import { FileType } from '../../../domain/file';

/**
 * @service FilesLocalService
 *
 * @description
 * The `FilesLocalService` provides functionality for handling file operations related to local storage.
 * It manages file creation and provides necessary file details.
 */
@Injectable()
export class FilesLocalService {
    constructor(private readonly configService: ConfigService<AllConfigType>) {}

    /**
     * Handles file creation and returns file details.
     *
     * @param file The file to be processed.
     * @returns A promise that resolves to an object containing file details.
     *
     * @throws { UnprocessableEntityException } If the file is not provided.
     *
     * @example
     * // Example response:
     * {
     *   file: {
     *     id: 'asas',
     *     path: '/api/v1/uploads/example-file.jpg'
     *   }
     * }
     */

    async create(file: Express.Multer.File): Promise<{ file: FileType }> {
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
                id: 'asas',
                path: `/${this.configService.get('app.apiPrefix', {
                    infer: true,
                })}/v1/${file.path}`,
            },
        } as any;
    }
}
