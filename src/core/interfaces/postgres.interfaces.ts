'use strict';

export interface IPostgreSQLConfig {
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_NAME: string;
    POSTGRES_CONNECTION_LIMIT: string;
    POSTGRES_POOL_TIMEOUT: string;
    POSTGRES_SCHEMA: string;
}
