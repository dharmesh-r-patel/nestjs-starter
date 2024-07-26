'use strict';

import { NotFoundException } from '@nestjs/common';

/**
 * Custom exception for user not found errors.
 *
 * @extends {NotFoundException}
 *
 * @description This exception is thrown when a requested user is not found in the system.
 * It extends the `NotFoundException` provided by NestJS.
 *
 * @example
 * ```typescript
 * throw new UserNotFoundException();
 * throw new UserNotFoundException('Specific error message');
 * ```
 */

export class UserNotFoundException extends NotFoundException {
    /**
     * Creates an instance of UserNotFoundException.
     *
     * @param {string} [error] - Optional error message.
     */

    constructor(error?: string) {
        super('error.user_not_found', error);
    }
}
