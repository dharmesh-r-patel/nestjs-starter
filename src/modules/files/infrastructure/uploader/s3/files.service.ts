import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';

import { FileType } from '../../../domain/file';

@Injectable()
export class FilesS3Service {
    constructor() {}

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
