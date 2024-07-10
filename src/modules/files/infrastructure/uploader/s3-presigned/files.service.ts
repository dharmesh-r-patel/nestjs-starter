import {
    HttpStatus,
    Injectable,
    PayloadTooLargeException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { ConfigService } from '../../../../../common/helper/services/config.service';
import { FileType } from '../../../domain/file';

import { FileUploadDto } from './dto/file.dto';

@Injectable()
export class FilesS3PresignedService {
    private s3: S3Client;

    constructor(private readonly configService: ConfigService) {
        this.s3 = new S3Client({
            region: configService.fileConfig.awsS3Region,
            credentials: {
                accessKeyId: configService.fileConfig.accessKeyId,
                secretAccessKey: configService.fileConfig.secretAccessKey,
            },
        });
    }

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

        if (file.fileSize > (this.configService.fileConfig.maxFileSize || 0)) {
            throw new PayloadTooLargeException({
                statusCode: HttpStatus.PAYLOAD_TOO_LARGE,
                error: 'Payload Too Large',
                message: 'File too large',
            });
        }

        const key = `${randomStringGenerator()}.${file.fileName.split('.').pop()?.toLowerCase()}`;

        const command = new PutObjectCommand({
            Bucket: this.configService.fileConfig.awsDefaultS3Bucket,
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

    async generatePresignedUrl(key: string, expiresIn: number): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.configService.fileConfig.awsDefaultS3Bucket,
            Key: key,
        });

        return await getSignedUrl(this.s3, command, { expiresIn });
    }
}
