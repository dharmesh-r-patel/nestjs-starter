import { Module } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { MulterModule } from '@nestjs/platform-express';

import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

import { HelperModule } from '../../../../../common/helper/helper.module';
import { ConfigService } from '../../../../../common/helper/services/config.service';
import { imageFileFilter } from '../../../../../providers/file-upload.service';

import { FilesS3Controller } from './files.controller';
import { FilesS3Service } from './files.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            imports: [HelperModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const s3 = new S3Client({
                    region: configService.fileConfig.awsS3Region,
                    credentials: {
                        accessKeyId: configService.fileConfig.accessKeyId,
                        secretAccessKey: configService.fileConfig.secretAccessKey,
                    },
                });

                return {
                    fileFilter: imageFileFilter,
                    storage: multerS3({
                        s3: s3,
                        bucket: configService.fileConfig.awsDefaultS3Bucket,
                        contentType: multerS3.AUTO_CONTENT_TYPE,
                        key: (request, file, callback) => {
                            callback(
                                null,
                                `${randomStringGenerator()}.${file.originalname
                                    .split('.')
                                    .pop()
                                    ?.toLowerCase()}`
                            );
                        },
                    }),
                };
            },
        }),
    ],
    controllers: [FilesS3Controller],
    providers: [FilesS3Service],
    exports: [FilesS3Service],
})
export class FilesS3Module {}
