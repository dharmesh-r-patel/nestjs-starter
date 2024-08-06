import { registerAs } from '@nestjs/config';

import { IsEnum, IsString, IsOptional, IsBoolean } from 'class-validator';

import { LoggerConfig } from '@config/type/logger-config.type';
import validateConfig from '@utils/validate-config';

const getBooleanEnvVar = (key: string, defaultValue: boolean = false): boolean => {
    const value = process.env[key];
    return value ? value.toLowerCase() === 'true' : defaultValue;
};

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

    @IsOptional()
    @IsString()
    LOGGER_ORGANIZATION: string;

    @IsOptional()
    @IsString()
    LOGGER_CONTEXT: string;

    @IsOptional()
    @IsString()
    LOGGER_APP: string;

    @IsOptional()
    @IsBoolean()
    LOGGER_DATABASE_STORAGE: boolean;

    @IsOptional()
    @IsString()
    LOGGER_LOG_LEVEL: string;

    @IsOptional()
    @IsBoolean()
    LOGGER_DURATION: boolean;

    @IsOptional()
    @IsString()
    LOGGER_DURATION_LOG_LEVEL: string;

    @IsOptional()
    @IsBoolean()
    LOGGER_CONSOLE_PRINT: boolean;

    @IsOptional()
    @IsBoolean()
    LOGGER_LOG_IN_FILE: boolean;

    @IsOptional()
    @IsString()
    LOGGER_SLACK_INC_WEBHOOK_URL: string;
}

/**
 * Configuration registration and validation.
 *
 * Registers the configuration with NestJS and validates the environment variables
 * using `EnvironmentVariablesValidator`. Returns an `LoggerConfig` object with default values
 * for the application configuration.
 *
 * @export
 * @function
 * @returns {LoggerConfig} The logger configuration.
 */

export default registerAs<LoggerConfig>('logger', (): LoggerConfig => {
    validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        nodeEnv: process.env.NODE_ENV || 'development',
        organization: process.env.LOGGER_ORGANIZATION || 'org',
        context: process.env.LOGGER_CONTEXT || 'mycontext',
        app: process.env.LOGGER_APP || 'api',
        database_storage: getBooleanEnvVar('LOGGER_DATABASE_STORAGE', false),
        database_log_level: process.env.LOGGER_LOG_LEVEL || 'error',
        duration: getBooleanEnvVar('LOGGER_DURATION', false),
        duration_log_level: process.env.LOGGER_DURATION_LOG_LEVEL || 'info',
        console_print: getBooleanEnvVar('LOGGER_CONSOLE_PRINT', false),
        log_in_file: getBooleanEnvVar('LOGGER_LOG_IN_FILE', false),
        slack_webhook:
            process.env.LOGGER_SLACK_INC_WEBHOOK_URL ||
            'https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX',
    };
});
