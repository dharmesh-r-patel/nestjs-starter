import { registerAs } from '@nestjs/config';

import { IsOptional, IsInt, Min, Max, IsString, ValidateIf, IsBoolean } from 'class-validator';

import validateConfig from '@utils/validate-config';

import { DatabaseConfig } from './type/database-config.type';

class EnvironmentVariablesValidator {
    @ValidateIf((envValues) => envValues.DATABASE_URL)
    @IsString()
    DATABASE_URL: string;

    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsString()
    POSTGRES_HOST: string;

    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsInt()
    @Min(0)
    @Max(65535)
    POSTGRES_PORT: number;

    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsString()
    POSTGRES_PASSWORD: string;

    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsString()
    POSTGRES_NAME: string;

    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsString()
    POSTGRES_USER: string;

    @IsBoolean()
    @IsOptional()
    DATABASE_SYNCHRONIZE: boolean;

    @IsInt()
    @IsOptional()
    POSTGRES_MAX_CONNECTIONS: number;

    @IsBoolean()
    @IsOptional()
    DATABASE_SSL_ENABLED: boolean;

    @IsBoolean()
    @IsOptional()
    DATABASE_REJECT_UNAUTHORIZED: boolean;

    @IsString()
    @IsOptional()
    DATABASE_CA: string;

    @IsString()
    @IsOptional()
    DATABASE_KEY: string;

    @IsString()
    @IsOptional()
    DATABASE_CERT: string;
}

export default registerAs<DatabaseConfig>('database', (): DatabaseConfig => {
    validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_NAME}?connection_limit=${process.env.POSTGRES_MAX_CONNECTIONS}&pool_timeout=${process.env.POSTGRES_POOL_TIMEOUT}&schema=${process.env.POSTGRES_SCHEMA}`,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
        password: process.env.POSTGRES_PASSWORD,
        name: process.env.POSTGRES_NAME,
        username: process.env.POSTGRES_USER,
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
        maxConnections: process.env.POSTGRES_MAX_CONNECTIONS
            ? parseInt(process.env.POSTGRES_MAX_CONNECTIONS, 10)
            : 100,
        poolTimeout: process.env.POSTGRES_POOL_TIMEOUT
            ? parseInt(process.env.POSTGRES_POOL_TIMEOUT, 10)
            : 100,
        schema: process.env.POSTGRES_SCHEMA ? process.env.POSTGRES_SCHEMA : 'public',
        sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
        rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
        ca: process.env.DATABASE_CA,
        key: process.env.DATABASE_KEY,
        cert: process.env.DATABASE_CERT,
    };
});
