'use strict';

/**
 * Configuration settings for the application.
 *
 * @typedef {Object} LoggerConfig
 * @property {string} nodeEnv - The environment in which the application is running, e.g., 'development', 'production', etc.
 * @property {string} organisation - The name of the organisation.
 * @property {string} context - The name of the context.
 * @property {string} app - The name of the app.
 * @property {string} slack_webhook - Slack webhook for logger.
 */

export type LoggerConfig = {
    nodeEnv: string;
    organization: string;
    context: string;
    app: string;
    slack_webhook: string;
    database_storage: boolean;
    database_log_level: string;
    duration: boolean;
    duration_log_level: string;
    console_print: boolean;
    log_in_file: boolean;
};
