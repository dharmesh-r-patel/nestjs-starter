import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

/**
 * Custom validator for checking if a string is a valid comma-separated list of numbers.
 *
 * @export
 * @class CommaSeparated
 * @implements {ValidatorConstraintInterface}
 */
@Injectable()
@ValidatorConstraint({ name: 'CommaSeparated', async: false })
export class CommaSeparated implements ValidatorConstraintInterface {
    /**
     * Validates if the given value is a comma-separated list of numbers.
     *
     * @param {string} propertyValue - The value to be validated.
     * @param {ValidationArguments} args - The validation arguments.
     * @returns {boolean} - Returns true if valid; otherwise, false.
     */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(propertyValue: string, args: ValidationArguments): boolean {
        //
        //
        const isValid = /^[0-9]+(,[0-9]+)*$/.test(propertyValue);

        if (isValid) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Default error message when validation fails.
     *
     * @param {ValidationArguments} args - The validation arguments.
     * @returns {string} - The error message.
     */

    defaultMessage(args: ValidationArguments): string {
        return `Invalid ${args.property}`;
    }
}

/**
 * Custom validator for checking if a string is in the correct "field direction" format.
 *
 * @export
 * @class SortBy
 * @implements {ValidatorConstraintInterface}
 */
@Injectable()
@ValidatorConstraint({ name: 'SortBy', async: false })
export class SortBy implements ValidatorConstraintInterface {
    /**
     * Validates if the given value is in the format of "field direction" where direction is "ASC" or "DESC".
     *
     * @param {string} value - The value to be validated.
     * @param {ValidationArguments} args - The validation arguments.
     * @returns {boolean} - Returns true if valid; otherwise, false.
     */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(value: string, args: ValidationArguments): boolean {
        // Split the input by spaces and validate each pair
        const parts = value.split(' ');

        // Ensure pairs of field direction (e.g., field direction, field direction, ...)
        if (parts.length % 2 !== 0) {
            return false;
        }

        // Regular expression to match valid field direction
        const fieldRegex = /^[\w]+$/;
        const directionRegex = /^(ASC|DESC|asc|desc|Asc|Desc)$/;

        // Iterate through pairs and validate
        for (let i = 0; i < parts.length; i += 2) {
            if (!fieldRegex.test(parts[i]) || !directionRegex.test(parts[i + 1])) {
                return false;
            }
        }

        return true;
    }

    /**
     * Default error message when validation fails.
     *
     * @param {ValidationArguments} args - The validation arguments.
     * @returns {string} - The error message.
     */

    defaultMessage(args: ValidationArguments): string {
        return `${args.property} must be in the format "field direction" where direction is "ASC" or "DESC", separated by spaces.`;
    }
}

// @Injectable()
// @ValidatorConstraint({ name: 'Sort', async: false })
// export class SortBy implements ValidatorConstraintInterface {
//     validate(propertyValue: string, args: ValidationArguments) {
//         const isValid = /^[\w]+([ ][(ASC|DESC|asc|desc|Asc|Desc)]{3,4})*$/.test(propertyValue);

//         if (isValid) {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     defaultMessage(args: ValidationArguments) {
//         return `Invalid ${args.property}`;
//     }
// }

// @Injectable()
// @ValidatorConstraint({ name: 'SortBy', async: false })
// export class SortBya implements ValidatorConstraintInterface {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     validate(propertyValue: string, args: ValidationArguments): boolean {
//         // Match strings like "name ASC" or "name DESC"
//         const isValid = /^[\w]+(\s(ASC|DESC|asc|desc|Asc|Desc))?$/.test(propertyValue);

//         return isValid;
//     }

//     defaultMessage(args: ValidationArguments): string {
//         return `Invalid sort value for ${args.property}. Expected format: "field ASC" or "field DESC".`;
//     }
// }
