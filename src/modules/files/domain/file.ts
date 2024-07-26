import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Transform } from 'class-transformer';
import { Allow } from 'class-validator';

import appConfig from '@config/app.config';
import fileConfig from '@config/file.config';
import { AppConfig } from '@config/type/app-config.type';
import { FileConfig, FileDriver } from '@config/type/file-config.type';

/**
 * @fileoverview
 * Defines the `FileType` class used for representing file metadata and handling file paths.
 *
 * @module
 * @description
 * The `FileType` class represents the metadata associated with a file, including its unique identifier and file path.
 * It uses decorators from `@nestjs/swagger` for API documentation and `class-transformer` for transforming file paths based on the file configuration.
 */
export class FileType {
    /**
     * The unique identifier for the file.
     *
     * @example 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae'
     * @type {string}
     */

    @ApiProperty({
        type: String,
        example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
    })
    @Allow()
    id: string;

    /**
     * The URL or path of the file. Transforms the file path based on the file driver configuration.
     * If the driver is LOCAL, the URL is constructed using the backend domain.
     * If the driver is S3 or S3_PRESIGNED, a presigned URL is generated for accessing the file.
     *
     * @example 'https://example.com/path/to/file.jpg'
     * @type {string}
     */

    @ApiResponseProperty({
        type: String,
        example: 'https://example.com/path/to/file.jpg',
    })
    @Transform(
        ({ value }) => {
            if ((fileConfig() as FileConfig).driver === FileDriver.LOCAL) {
                return (appConfig() as AppConfig).backendDomain + value;
            } else if (
                [FileDriver.S3_PRESIGNED, FileDriver.S3].includes(
                    (fileConfig() as FileConfig).driver
                )
            ) {
                const s3 = new S3Client({
                    region: (fileConfig() as FileConfig).awsS3Region ?? '',
                    credentials: {
                        accessKeyId: (fileConfig() as FileConfig).accessKeyId ?? '',
                        secretAccessKey: (fileConfig() as FileConfig).secretAccessKey ?? '',
                    },
                });

                const command = new GetObjectCommand({
                    Bucket: (fileConfig() as FileConfig).awsDefaultS3Bucket ?? '',
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
