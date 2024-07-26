import {
    HttpStatus,
    Injectable,
    PayloadTooLargeException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';

import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// import { ConfigService } from '../../../../../common/helper/services/config.service';
import { FileType } from '../../../domain/file';

import { FileUploadDto } from './dto/file.dto';

/**
 * @module FilesS3PresignedService
 *
 * @description
 * The `FilesS3PresignedService` handles operations related to file uploads and downloads using Amazon S3 with presigned URLs. It provides methods for creating upload presigned URLs and generating download presigned URLs.
 */
@Injectable()
export class FilesS3PresignedService {
    private s3: S3Client;

    constructor(private readonly configService: ConfigService) {
        this.s3 = new S3Client({
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
    }

    /**
     * Creates a presigned URL for uploading a file to Amazon S3.
     *
     * @param file - The file upload data containing file information.
     * @returns An object containing the file metadata and the presigned URL for uploading.
     *
     * @throws {UnprocessableEntityException} If the file is not provided or has an unsupported type.
     * @throws {PayloadTooLargeException} If the file size exceeds the maximum allowed size.
     *
     * @example
     * const response = await this.create({
     *   fileName: 'image.jpg',
     *   fileSize: 123456
     * });
     * // response will include file metadata and uploadSignedUrl
     */

    async create(file: FileUploadDto): Promise<{ file: FileType; uploadSignedUrl: string }> {
        if (!file) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    file: 'selectFile',
                },
            });
        }

        if (!file.fileName.match(/\.(jpg|jpeg|png|gif)$/i)) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    file: `cantUploadFileType`,
                },
            });
        }

        if (
            file.fileSize >
            (this.configService.get('file.maxFileSize', {
                infer: true,
            }) || 0)
        ) {
            throw new PayloadTooLargeException({
                statusCode: HttpStatus.PAYLOAD_TOO_LARGE,
                error: 'Payload Too Large',
                message: 'File too large',
            });
        }

        const key = `${randomStringGenerator()}.${file.fileName.split('.').pop()?.toLowerCase()}`;

        const command = new PutObjectCommand({
            Bucket: this.configService.getOrThrow('file.awsDefaultS3Bucket', {
                infer: true,
            }),
            Key: key,
            ContentLength: file.fileSize,
        });
        const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

        // const data = await this.fileRepository.create({
        //     path: key,
        // });

        const data = {
            path: key,
        } as any;

        return {
            file: data,
            uploadSignedUrl: signedUrl,
        };
    }

    /**
     * Generates a presigned URL for downloading a file from Amazon S3.
     *
     * @param key - The key (path) of the file in the S3 bucket.
     * @param expiresIn - The expiration time for the presigned URL in seconds.
     * @returns The presigned URL for downloading the file.
     *
     * @example
     * const url = await this.generatePresignedUrl('path/to/file', 3600);
     * // url will be a presigned URL for downloading the file
     */

    async generatePresignedUrl(key: string, expiresIn: number): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.configService.getOrThrow('file.awsDefaultS3Bucket', {
                infer: true,
            }),
            Key: key,
        });

        return await getSignedUrl(this.s3, command, { expiresIn });
    }
}
