import { registerAs } from '@nestjs/config';

import { IsOptional, IsInt, Min, Max, IsString, ValidateIf, IsBoolean } from 'class-validator';

import validateConfig from '@utils/validate-config';

import { DatabaseConfig } from './type/database-config.type';

/**
 * Class to validate environment variables using class-validator decorators.
 *
 * @export
 * @class EnvironmentVariablesValidator
 */

class EnvironmentVariablesValidator {
    /**
     * URL for the database connection. Overrides individual PostgreSQL settings if provided.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @ValidateIf((envValues) => envValues.DATABASE_URL)
    @IsString()
    DATABASE_URL: string;

    /**
     * PostgreSQL host if `DATABASE_URL` is not provided.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsString()
    POSTGRES_HOST: string;

    /**
     * PostgreSQL port if `DATABASE_URL` is not provided.
     * Must be between 0 and 65535.
     *
     * @type {number}
     * @memberof EnvironmentVariablesValidator
     */

    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsInt()
    @Min(0)
    @Max(65535)
    POSTGRES_PORT: number;

    /**
     * PostgreSQL password if `DATABASE_URL` is not provided.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsString()
    POSTGRES_PASSWORD: string;

    /**
     * PostgreSQL database name if `DATABASE_URL` is not provided.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsString()
    POSTGRES_NAME: string;

    /**
     * PostgreSQL user if `DATABASE_URL` is not provided.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsString()
    POSTGRES_USER: string;

    /**
     * Whether to synchronize the database schema on every application start.
     *
     * @type {boolean}
     * @memberof EnvironmentVariablesValidator
     */

    @IsBoolean()
    @IsOptional()
    DATABASE_SYNCHRONIZE: boolean;

    /**
     * Maximum number of PostgreSQL connections.
     *
     * @type {number}
     * @memberof EnvironmentVariablesValidator
     */

    @IsInt()
    @IsOptional()
    POSTGRES_MAX_CONNECTIONS: number;

    /**
     * Whether to enable SSL for the database connection.
     *
     * @type {boolean}
     * @memberof EnvironmentVariablesValidator
     */

    @IsBoolean()
    @IsOptional()
    DATABASE_SSL_ENABLED: boolean;

    /**
     * Whether to reject unauthorized SSL certificates.
     *
     * @type {boolean}
     * @memberof EnvironmentVariablesValidator
     */

    @IsBoolean()
    @IsOptional()
    DATABASE_REJECT_UNAUTHORIZED: boolean;

    /**
     * Path to the SSL CA certificate.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @IsString()
    @IsOptional()
    DATABASE_CA: string;

    /**
     * Path to the SSL key file.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @IsString()
    @IsOptional()
    DATABASE_KEY: string;

    /**
     * Path to the SSL certificate file.
     *
     * @type {string}
     * @memberof EnvironmentVariablesValidator
     */

    @IsString()
    @IsOptional()
    DATABASE_CERT: string;
}

/**
 * Configuration registration and validation for database settings.
 *
 * Registers the database configuration with NestJS and validates the environment variables
 * using `EnvironmentVariablesValidator`. Returns a `DatabaseConfig` object with default values
 * and environment variable values for the database configuration.
 *
 * @export
 * @function
 * @returns {DatabaseConfig} The database configuration.
 */

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
