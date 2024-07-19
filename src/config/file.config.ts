import { registerAs } from '@nestjs/config';

import { IsEnum, IsString, ValidateIf, IsOptional } from 'class-validator';

import { FileDriver, FileConfig } from '@config/type/file-config.type';
import validateConfig from '@utils/validate-config';

class EnvironmentVariablesValidator {
    @IsEnum(FileDriver)
    @IsOptional()
    FILE_DRIVER: FileDriver;

    @ValidateIf((envValues) =>
        [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
    )
    @IsString()
    AWS_ACCESS_KEY_ID: string;

    @ValidateIf((envValues) =>
        [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
    )
    @IsString()
    AWS_SECRET_ACCESS_KEY: string;

    @ValidateIf((envValues) =>
        [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
    )
    @IsString()
    AWS_DEFAULT_S3_BUCKET: string;

    @ValidateIf((envValues) =>
        [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
    )
    @IsString()
    AWS_S3_REGION: string;

    @IsString()
    @IsOptional()
    MAX_FILE_SIZE: number;
}

export default registerAs<FileConfig>('file', (): FileConfig => {
    validateConfig(process.env, EnvironmentVariablesValidator);

    // console.log(
    //     'registerAS fileconfig',
    //     (process.env.FILE_DRIVER as FileDriver | undefined) ?? FileDriver.LOCAL,
    //     process.env.FILE_DRIVER,
    //     process.env
    // );

    return {
        driver: (process.env.FILE_DRIVER as FileDriver | undefined) ?? FileDriver.LOCAL,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        awsDefaultS3Bucket: process.env.AWS_DEFAULT_S3_BUCKET,
        awsS3Region: process.env.AWS_S3_REGION,
        maxFileSize: process.env.MAX_FILE_SIZE
            ? parseInt(process.env.MAX_FILE_SIZE, 10)
            : process.env.MAX_FILE_SIZE
              ? parseInt(process.env.MAX_FILE_SIZE, 10)
              : 5242880,
        // maxFileSize: 5242880, // 5mb
    };
});
