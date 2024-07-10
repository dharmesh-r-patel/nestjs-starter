import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';

import { ConfigService } from '../../../../../common/helper/services/config.service';
import { FileType } from '../../../domain/file';

@Injectable()
export class FilesLocalService {
    constructor(private readonly configService: ConfigService) {}

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
                path: `/${this.configService.appConfig.apiPrefix}/v1/${file.path}`,
            },
        } as any;

        // return {
        //     file: await this.fileRepository.create({
        //         path: `/${this.configService.get('app.apiPrefix', {
        //             infer: true,
        //         })}/v1/${file.path}`,
        //     }),
        // };
    }
}
