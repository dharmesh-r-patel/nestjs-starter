import { AppConfig } from './app-config.type';
import { DatabaseConfig } from './database-config.type';
import { FileConfig } from './file-config.type';
import { LoggerConfig } from './logger-config.type';

/**
 * Aggregated configuration type for the entire application.
 *
 * @typedef {Object} AllConfigType
 * @property {AppConfig} app - Configuration settings related to the application itself.
 * @property {DatabaseConfig} database - Configuration settings related to the database.
 * @property {FileConfig} file - Configuration settings related to file management.
 * @property {LoggerConfig} logger - Configuration settings related to logger.
 */

export type AllConfigType = {
    app: AppConfig;
    database: DatabaseConfig;
    file: FileConfig;
    logger: LoggerConfig;
};
