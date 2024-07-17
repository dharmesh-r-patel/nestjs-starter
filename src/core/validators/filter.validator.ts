import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'CommaSeparated', async: false })
export class CommaSeparated implements ValidatorConstraintInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(propertyValue: string, args: ValidationArguments) {
        //
        //
        const isValid = /^[0-9]+(,[0-9]+)*$/.test(propertyValue);

        if (isValid) {
            return true;
        } else {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return `Invalid ${args.property}`;
    }
}

@Injectable()
@ValidatorConstraint({ name: 'SortBy', async: false })
export class SortBy implements ValidatorConstraintInterface {
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
