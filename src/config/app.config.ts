import { registerAs } from '@nestjs/config';

import { IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

import { AppConfig } from '@config/type/app-config.type';
import validateConfig from '@utils/validate-config';

enum Environment {
    Development = 'development',
    Production = 'production',
    Staging = 'staging',
    Test = 'testing',
}

/**
 * Class to validate environment variables using class-validator decorators.
 *
 * @export
 * @class EnvironmentVariablesValidator
 */

class EnvironmentVariablesValidator {
    @IsEnum(Environment)
    @IsOptional()
    NODE_ENV: Environment;

    @IsString()
    @IsOptional()
    APP_NAME: string;

    @IsString()
    @IsOptional()
    APP_DESCRIPTION: string;

    @IsString()
    @IsOptional()
    APP_VERSION: string;

    @IsString()
    @IsOptional()
    APP_PREFIX: string;

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

/**
 * Configuration registration and validation.
 *
 * Registers the configuration with NestJS and validates the environment variables
 * using `EnvironmentVariablesValidator`. Returns an `AppConfig` object with default values
 * for the application configuration.
 *
 * @export
 * @function
 * @returns {AppConfig} The application configuration.
 */

export default registerAs<AppConfig>('app', (): AppConfig => {
    validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        nodeEnv: process.env.NODE_ENV || 'development',
        name: process.env.APP_NAME || 'app',
        description: process.env.APP_DESCRIPTION || 'description',
        version: process.env.APP_VERSION || '1',
        appPrefix: process.env.APP_PREFIX || 'docs',
        workingDirectory: process.env.PWD || process.cwd(),
        frontendDomain: process.env.FRONTEND_DOMAIN,
        backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',
        port: process.env.APP_PORT
            ? parseInt(process.env.APP_PORT, 10)
            : process.env.PORT
              ? parseInt(process.env.PORT, 10)
              : 3000,
        apiPrefix: process.env.API_PREFIX || 'api',
    };
});
