import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Transform } from 'class-transformer';
import { Allow } from 'class-validator';

import { ConfigService } from '../../../common/helper/services/config.service';
// import { AppConfig } from '../../../config/app-config.type';
import { FileDriver } from '../../../core/enum/file.type';
import { IAppConfig } from '../../../core/interfaces/app.interfaces';
import { IFileConfig } from '../../../core/interfaces/file.interfaces';
// import appConfig from '../../../config/app.config';
// import { FileConfig /*, FileDriver  */ } from '../config/file-config.type';
// import fileConfig from '../config/file.config';

export class FileType {
    constructor(private readonly configService: ConfigService) {}

    @ApiProperty({
        type: String,
        example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
    })
    @Allow()
    id: string;

    @ApiResponseProperty({
        type: String,
        example: 'https://example.com/path/to/file.jpg',
    })
    @Transform(
        ({ value }) => {
            if ((new ConfigService().fileConfig as IFileConfig).driver === FileDriver.LOCAL) {
                return (new ConfigService().appConfig as IAppConfig).backendDomain + value;
            } else if (
                [FileDriver.S3_PRESIGNED, FileDriver.S3].includes(
                    (new ConfigService().fileConfig as IFileConfig).driver
                )
            ) {
                const s3 = new S3Client({
                    region: (new ConfigService().fileConfig as IFileConfig).awsS3Region ?? '',
                    credentials: {
                        accessKeyId:
                            (new ConfigService().fileConfig as IFileConfig).accessKeyId ?? '',
                        secretAccessKey:
                            (new ConfigService().fileConfig as IFileConfig).secretAccessKey ?? '',
                    },
                });
                const command = new GetObjectCommand({
                    Bucket:
                        (new ConfigService().fileConfig as IFileConfig).awsDefaultS3Bucket ?? '',
                    Key: value,
                });
                return getSignedUrl(s3, command, { expiresIn: 3600 });
            }

            return value;
        },
        {
            toPlainOnly: true,
        }
    )
    path: string;
}
