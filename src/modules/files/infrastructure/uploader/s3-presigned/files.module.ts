import { Module } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

// import { HelperModule } from '../../../../../common/helper/helper.module';
// import { ConfigService } from '../../../../../common/helper/services/config.service';
import { AllConfigType } from '@config/type/config.type';

import { imageFileFilter } from '../../../../../providers/file-upload.service';

import { FilesS3PresignedController } from './files.controller';
import { FilesS3PresignedService } from './files.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService<AllConfigType>) => {
                const s3 = new S3Client({
                    region: configService.get('file.awsS3Region', { infer: true }),
                    credentials: {
                        accessKeyId: configService.getOrThrow('file.accessKeyId', {
                            infer: true,
                        }),
                        secretAccessKey: configService.getOrThrow('file.secretAccessKey', {
                            infer: true,
                        }),
                    },
                });

                return {
                    fileFilter: imageFileFilter,
                    storage: multerS3({
                        s3: s3,
                        bucket: '',
                        acl: 'public-read',
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
    controllers: [FilesS3PresignedController],
    providers: [FilesS3PresignedService],
    exports: [FilesS3PresignedService],
})
export class FilesS3PresignedModule {}
