import { registerAs } from '@nestjs/config';

import { IsEnum, IsString, ValidateIf, IsOptional } from 'class-validator';

import { FileDriver, FileConfig } from '@config/type/file-config.type';
import validateConfig from '@utils/validate-config';

/**
 * Class to validate environment variables related to file storage configuration.
 *
 * @export
 * @class EnvironmentVariablesValidator
 */

class EnvironmentVariablesValidator {
    /**
     * Driver for file storage. Specifies the method of file storage, e.g., local file system or S3.
     *
     * @type {FileDriver}
     * @memberof EnvironmentVariablesValidator
     */

    @IsEnum(FileDriver)
    @IsOptional()
    FILE_DRIVER: FileDriver;

    /**
     * AWS access key ID, required if using S3 or presigned S3 driver.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @ValidateIf((envValues) =>
        [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
    )
    @IsString()
    AWS_ACCESS_KEY_ID: string;

    /**
     * AWS secret access key, required if using S3 or presigned S3 driver.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @ValidateIf((envValues) =>
        [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
    )
    @IsString()
    AWS_SECRET_ACCESS_KEY: string;

    /**
     * Default S3 bucket name, required if using S3 or presigned S3 driver.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @ValidateIf((envValues) =>
        [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
    )
    @IsString()
    AWS_DEFAULT_S3_BUCKET: string;

    /**
     * AWS S3 region, required if using S3 or presigned S3 driver.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @ValidateIf((envValues) =>
        [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
    )
    @IsString()
    AWS_S3_REGION: string;

    /**
     * Maximum file size allowed for uploads, in bytes.
     *
     * @type {number}
     * @memberof EnvironmentVariablesValidator
     */

    @IsString()
    @IsOptional()
    MAX_FILE_SIZE: number;
}

/**
 * Configuration registration and validation for file storage settings.
 *
 * Registers the file storage configuration with NestJS and validates the environment variables
 * using `EnvironmentVariablesValidator`. Returns a `FileConfig` object with default values
 * and environment variable values for file storage configuration.
 *
 * @export
 * @function
 * @returns {FileConfig} The file storage configuration.
 */

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
