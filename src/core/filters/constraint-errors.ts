/**
 * A record mapping database constraint error codes to user-friendly error messages.
 *
 * @constant
 * @type {Record<string, string>}
 */

export const constraintErrors: Record<string, string> = {
    /**
     * Unique constraint error for email.
     *
     * @type {string}
     * @example
     * 'error.unique.email'
     */

    UQ_97672ac88f789774dd47f7c8be3: 'error.unique.email',
};
