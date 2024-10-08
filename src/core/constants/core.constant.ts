/**
 * Maps HTTP status codes to their respective status messages.
 *
 * @const {Record<number, string>}
 * @example
 * // Usage example:
 * console.log(HTTP_STATUS_MESSAGES[200]); // Output: 'OK'
 */

export const HTTP_STATUS_MESSAGES = {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'NonAuthoritativeInfo',
    204: 'NoContent',
    205: 'ResetContent',
    206: 'PartialContent',
    301: 'Move Permanently',
    302: 'Found',
    304: 'Not Modified',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    409: 'Conflict',
    413: 'Payload Too Large',
    414: 'URI Too Large',
    415: 'Unsupported Media Type',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
};

/**
 * Metadata key used for response serialization in decorators.
 *
 * @const {string}
 */

export const RESPONSE_SERIALIZATION_META_KEY = 'ResponseSerializationMetaKey';

/**
 * Key used to denote public routes.
 *
 * @const {string}
 */
export const PUBLIC_ROUTE_KEY = 'PUBLIC';
