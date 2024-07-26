'use strict';

import { BadRequestException } from '@nestjs/common';

/**
 * Exception class for handling non-image file uploads.
 *
 * @description This exception is thrown when a file that is not an image is uploaded, extending the `BadRequestException` from NestJS.
 *
 * @example
 * ```typescript
 * import { FileNotImageException } from './path/to/exception';
 *
 * throw new FileNotImageException('Custom error message');
 * ```
 *
 * @extends {BadRequestException}
 */

export class FileNotImageException extends BadRequestException {
    /**
     * Creates an instance of FileNotImageException.
     *
     * @param {string | any} [message] - Optional custom error message.
     * @param {string} [error] - Optional custom error code.
     */

    constructor(message?: string | any, error?: string) {
        if (message) {
            super(message, error);
        } else {
            super('error.file.not_image');
        }
    }
}
