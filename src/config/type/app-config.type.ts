'use strict';

/**
 * Configuration settings for the application.
 *
 * @typedef {Object} AppConfig
 * @property {string} nodeEnv - The environment in which the application is running, e.g., 'development', 'production', etc.
 * @property {string} name - The name of the application.
 * @property {string} description - A brief description of the application.
 * @property {string} version - The version of the application.
 * @property {string} appPrefix - The prefix for application routes or URLs.
 * @property {string} workingDirectory - The directory in which the application is running or storing files.
 * @property {string} [frontendDomain] - The domain for the frontend application. This is optional.
 * @property {string} backendDomain - The domain for the backend application.
 * @property {number} port - The port on which the application is running.
 * @property {string} apiPrefix - The prefix for API routes.
 */

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
