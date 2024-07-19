// import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { IsEnum, IsInt, IsOptional, IsString, ValidateIf, IsUrl, Max, Min } from 'class-validator';
import * as dotenv from 'dotenv';

// import { FileDriver } from '../../../core/enum/file.type';
import { IAppConfig } from '../../../core/interfaces/app.interfaces';
import { IAwsConfig } from '../../../core/interfaces/aws.interfaces';
import { IFileConfig } from '../../../core/interfaces/file.interfaces';
import { IJWTConfig } from '../../../core/interfaces/jwt.interfaces';
import { INodeEmailerConfig } from '../../../core/interfaces/node-emailer.interfaces';
// import { IPostgreSQLConfig } from '../../../core/interfaces/postgres.interfaces';
import { ISendGridConfig } from '../../../core/interfaces/sendgrid.interfaces';
import { ISMSConfig } from '../../../core/interfaces/sms.interfaces';
import { IUploadFileConfig } from '../../../core/interfaces/upload-file.interfaces';
import validateConfig from '../../../utils/validate-config';

/**
 * Config service
 * @export
 * @class ConfigService
 */

class EnvVarAppConfigValidator {
    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    APP_PORT: number;

    @IsUrl({ require_tld: false })
    @IsOptional()
    FRONTEND_DOMAIN: string;

    @IsUrl({ require_tld: false })
    @IsOptional()
    BACKEND_DOMAIN: string;

    @IsString()
    @IsOptional()
    API_PREFIX: string;
}

// class EnvVarFileConfigValidator {
//     // @IsEnum(FileDriver)
//     // FILE_DRIVER: FileDriver;

//     // @ValidateIf((envValues) =>
//     //     [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
//     // )
//     // @IsString()
//     // AWS_ACCESS_KEY_ID: string;

//     // @ValidateIf((envValues) =>
//     //     [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
//     // )
//     // @IsString()
//     // AWS_SECRET_ACCESS_KEY: string;

//     // @ValidateIf((envValues) =>
//     //     [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
//     // )
//     // @IsString()
//     // AWS_DEFAULT_S3_BUCKET: string;

//     // @ValidateIf((envValues) =>
//     //     [FileDriver.S3, FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)
//     // )
//     @IsString()
//     AWS_S3_REGION: string;
// }

export class ConfigService {
    constructor() {
        const nodeEnv = this.nodeEnv;
        // dotenv.config({
        //   path: nodeEnv === "production" ? ".env" : `.env.${nodeEnv}`,
        // });
        dotenv.config({
            path:
                nodeEnv === 'production'
                    ? '.env.staging'
                    : nodeEnv === 'staging'
                      ? '.env.staging'
                      : '.env.development',
        });

        // // Replace \\n with \n to support multiline strings in AWS
        // for (const envName of Object.keys(process.env)) {
        //   process.env[envName] = process.env[envName].replace(/\\n/g, "\n");
        // }
    }

    public get(key: string): string {
        return process.env[key] || 'undefined';
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }

    public getBoolean(key: string): boolean {
        return Boolean(this.get(key));
    }

    get nodeEnv(): string {
        return this.get('NODE_ENV') || 'development';
    }

    // get typeOrmConfig(): TypeOrmModuleOptions {
    //   const dbConfig = {
    //     // eslint-disable-next-line @typescript-eslint/prefer-as-const
    //     type: "mysql" as "mysql",
    //     host: this.get("DATABASE_HOST"),
    //     port: this.getNumber("DATABASE_PORT"),
    //     username: this.get("DATABASE_USER"),
    //     password: this.get("DATABASE_PASS"),
    //     database: this.get("DATABASE_SCHEMA"),
    //     authSource: "admin",
    //     synchronize: true,
    //     multipleStatements: true,
    //     entities: ["src/**/**.entity{.ts,.js}"],
    //     bigNumberStrings: false,
    //   };
    //   return dbConfig;
    // }

    // get appConfig(): IAppConfig {
    //     validateConfig(process.env, EnvVarAppConfigValidator);
    //     return {
    //         name: this.get('APP_NAME') || '',
    //         workingDirectory: process.env.PWD || process.cwd(),
    //         frontendDomain: this.get('FRONTEND_DOMAIN') || '',
    //         backendDomain: this.get('BACKEND_DOMAIN') || '',
    //         port: this.getNumber('PORT'),
    //         apiPrefix: this.get('API_PREFIX') || '',
    //     };
    // }

    get prismaConfig(): string {
        return `postgresql://${this.get('POSTGRES_USER')}:${this.get('POSTGRES_PASSWORD')}@${this.get('POSTGRES_HOST')}:${this.get('POSTGRES_PORT')}/${this.get('POSTGRES_NAME')}?connection_limit=${this.get('POSTGRES_CONNECTION_LIMIT')}&pool_timeout=${this.get('POSTGRES_POOL_TIMEOUT')}&schema=${this.get('POSTGRES_SCHEMA')}`;
    }

    // get awsS3Config(): IAwsConfig {
    //     return {
    //         AWS_S3_ACCESS_KEY_ID: this.get('AWS_S3_ACCESS_KEY_ID'),
    //         AWS_S3_SECRET_ACCESS_KEY: this.get('AWS_S3_SECRET_ACCESS_KEY'),
    //         AWS_S3_BUCKET_NAME: this.get('AWS_S3_BUCKET_NAME'),
    //         AWS_S3_DEFAULT_REGION: this.get('AWS_S3_DEFAULT_REGION'),
    //         AWS_S3_TEMP_DIRECTORY: this.get('AWS_S3_TEMP_DIRECTORY'),
    //         AWS_S3_ENDPOINT: this.get('AWS_S3_ENDPOINT'),
    //         AWS_S3_SERVER_HOST: this.get('AWS_S3_SERVER_HOST'),
    //         AWS_S3_COMPANION_SECRET: this.get('AWS_S3_COMPANION_SECRET'),
    //         TUS_STORAGE_DRIVER: this.get('TUS_STORAGE_DRIVER'),
    //     };
    // }

    // get qrConfig() {
    //     return {
    //         QR_IMAGE: this.get('QR_IMAGE') || '',
    //         QR_IMAGE_PATH: this.get('QR_IMAGE_PATH') || '',
    //         QR_IMAGE_PATH_SALT: this.get('QR_IMAGE_PATH_SALT') || '',
    //     };
    // }

    // get jwtConfig(): IJWTConfig {
    //     return {
    //         secret: this.get('JWT_SECRET_KEY'),
    //         algorithm: this.get('JWT_ALGORITHM'),
    //         issuer: this.get('JWT_ISSUER'),
    //         audience: this.get('JWT_AUDIENCE'),
    //         expiresInSeconds: this.getNumber('JWT_EXPIRES_IN_SECONDS'),
    //         expirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
    //     };
    // }

    // get sendgridConfig(): ISendGridConfig {
    //     return {
    //         SENDGRID_API_KEY: this.get('SENDGRID_API_KEY'),
    //         FROM_EMAIL: this.get('FROM_EMAIL'),
    //         TO_EMAIL: this.get('TO_EMAIL'),
    //         WELCOME_EMAIL: this.get('WELCOME_EMAIL'),
    //     };
    // }

    // get nodeemailerConfig(): INodeEmailerConfig {
    //     return {
    //         NODE_EMAILER_HOST: this.get('NODE_EMAILER_HOST'),
    //         NODE_EMAILER_PORT: this.getNumber('NODE_EMAILER_PORT'),
    //         NODE_EMAILER_USER: this.get('NODE_EMAILER_USER'),
    //         NODE_EMAILER_PASSWORD: this.get('NODE_EMAILER_PASSWORD'),
    //         NODE_EMAILER_FROM_EMAIL: this.get('NODE_EMAILER_FROM_EMAIL'),
    //         NODE_EMAILER_TO_EMAIL: this.get('NODE_EMAILER_TO_EMAIL'),
    //     };
    // }

    // get smsConfig(): ISMSConfig {
    //     return {
    //         SMS_PROVIDER_NAME: this.get('SMS_PROVIDER_NAME'),
    //         API_KEY: this.get('API_KEY'),
    //         SENDER_ID: this.get('SENDER_ID'),
    //     };
    // }

    // get uploadFileConfig(): IUploadFileConfig {
    //     return {
    //         TEMP_FILE_UPLOAD_URL: this.get('TEMP_FILE_UPLOAD_URL'),
    //         FILE_UPLOAD_DESTINATION: this.get('FILE_UPLOAD_DESTINATION'),
    //         MAX_UPLOAD_FILE_SIZE: this.getNumber('MAX_UPLOAD_FILE_SIZE'),
    //         PROFILE_PIC_FILE_PATH: this.get('PROFILE_PIC_FILE_PATH'),
    //         MULTIPLE_FILE_PATH: this.get('MULTIPLE_FILE_PATH'),
    //     };
    // }

    // get fileConfig(): IFileConfig {
    //     // validateConfig(process.env, EnvVarFileConfigValidator);
    //     return {
    //         driver: (this.get('FILE_DRIVER') as any | undefined) ?? undefined,
    //         accessKeyId: this.get('AWS_ACCESS_KEY_ID'),
    //         secretAccessKey: this.get('AWS_SECRET_ACCESS_KEY'),
    //         awsDefaultS3Bucket: this.get('AWS_DEFAULT_S3_BUCKET'),
    //         awsS3Region: this.get('AWS_S3_REGION'),
    //         maxFileSize: 5242880, // 5mb
    //     };
    // }
}
