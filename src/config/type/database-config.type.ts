/**
 * Configuration settings for database connectivity.
 *
 * @typedef {Object} DatabaseConfig
 * @property {string} [url] - The connection URL for the database. Used as an alternative to other individual fields.
 * @property {string} [type] - The type of database (e.g., 'postgres', 'mysql').
 * @property {string} [host] - The hostname or IP address of the database server.
 * @property {number} [port] - The port number for the database connection.
 * @property {string} [password] - The password for database authentication.
 * @property {string} [name] - The name of the database to connect to.
 * @property {string} [username] - The username for database authentication.
 * @property {number} [poolTimeout] - The timeout duration for database connections in the connection pool.
 * @property {string} [schema] - The default schema to use for database operations.
 * @property {boolean} [synchronize] - Whether to automatically synchronize the database schema.
 * @property {number} maxConnections - The maximum number of connections allowed in the connection pool.
 * @property {boolean} [sslEnabled] - Whether SSL is enabled for the database connection.
 * @property {boolean} [rejectUnauthorized] - Whether to reject unauthorized SSL certificates.
 * @property {string} [ca] - The CA certificate for SSL connections.
 * @property {string} [key] - The client certificate key for SSL connections.
 * @property {string} [cert] - The client certificate for SSL connections.
 */

export type DatabaseConfig = {
    url?: string;
    type?: string;
    host?: string;
    port?: number;
    password?: string;
    name?: string;
    username?: string;
    poolTimeout?: number;
    schema?: string;
    synchronize?: boolean;
    maxConnections: number;
    sslEnabled?: boolean;
    rejectUnauthorized?: boolean;
    ca?: string;
    key?: string;
    cert?: string;
};
