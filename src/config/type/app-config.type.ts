'use strict';

export type AppConfig = {
    nodeEnv: string;
    name: string;
    description: string;
    version: string;
    appPrefix: string;
    workingDirectory: string;
    frontendDomain?: string;
    backendDomain: string;
    port: number;
    apiPrefix: string;
};
