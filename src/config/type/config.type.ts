import { AppConfig } from './app-config.type';
import { DatabaseConfig } from './database-config.type';
import { FileConfig } from './file-config.type';

export type AllConfigType = {
    app: AppConfig;
    database: DatabaseConfig;
    file: FileConfig;
};
