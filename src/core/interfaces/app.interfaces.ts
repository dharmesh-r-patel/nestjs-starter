'use strict';

'use strict';

/**
 * Configuration interface for application settings.
 *
 * @export
 * @interface IAppConfig
 */
export interface IAppConfig {
    /**
     * The name of the application.
     *
     * @type {string}
     * @memberof IAppConfig
     */

    name: string;

    /**
     * The working directory of the application.
     *
     * @type {string}
     * @memberof IAppConfig
     */

    workingDirectory: string;

    /**
     * The domain for the frontend application.
     * This property is optional.
     *
     * @type {string}
     * @memberof IAppConfig
     */

    frontendDomain?: string;

    /**
     * The domain for the backend application.
     *
     * @type {string}
     * @memberof IAppConfig
     */

    backendDomain: string;

    /**
     * The port on which the application is running.
     *
     * @type {number}
     * @memberof IAppConfig
     */

    port: number;

    /**
     * The API prefix used in the application.
     *
     * @type {string}
     * @memberof IAppConfig
     */

    apiPrefix: string;
}
