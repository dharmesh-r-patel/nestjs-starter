'use strict';

export interface IAppConfig {
    name: string;
    workingDirectory: string;
    frontendDomain?: string;
    backendDomain: string;
    port: number;
    apiPrefix: string;
}
