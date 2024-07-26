// isOptionalIntMinOne.decorator.ts

import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Custom decorator that checks if a value is a number or a numeric string,
 * and if it is greater than or equal to 1.
 *
 * @param {ValidationOptions} [validationOptions] - Options used to pass to validation decorators.
 * @returns {Function} - A function that registers the custom validator.
 *
 * @example
 * // Usage in a class property
 * class ExampleDto {
 *   @IsNumberStringOrNumber({ message: 'Value must be a number or a numeric string' })
 *   someProperty: string | number;
 * }
 */

export function IsNumberStringOrNumber(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'IsOptionalIntMinOne',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                /**
                 * Validates the value to check if it is a number or a numeric string
                 * and if it is greater than or equal to 1.
                 *
                 * @param {any} value - The value being validated.
                 * @param {ValidationArguments} args - Arguments to the validation function.
                 * @returns {boolean} - Returns true if the value is a number or numeric string >= 1.
                 */

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validate(value: any, args: ValidationArguments): boolean {
                    const strippedValue = String(value).replace(/['"]+/g, '');
                    const numberValue = Number(strippedValue);
                    return (
                        typeof numberValue === 'number' && !isNaN(numberValue) && numberValue >= 1
                    );
                },

                /**
                 * Default message shown when validation fails.
                 *
                 * @param {ValidationArguments} args - Arguments to the validation function.
                 * @returns {string} - Default error message.
                 */

                defaultMessage(args: ValidationArguments): string {
                    return `${args.property} must be a number or numeric string`;
                },
            },
        });
    };
}

// import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// export function IsNumberStringOrNumber(validationOptions?: ValidationOptions) {
//     return function (object: object, propertyName: string) {
//         registerDecorator({
//             name: 'IsNumberStringOrNumber',
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             validator: {
//                 validate(value: any, args: ValidationArguments) {
//                     console.log('---------------------------', args);
//                     const strippedValue = String(value).replace(/['"]+/g, '');
//                     const numberValue = Number(strippedValue);
//                     console.log('HAHAHAHHHHHHHHHHHHHHHHH', isNaN(numberValue) ? false : true);
//                     return isNaN(numberValue) ? false : true;
//                 },
//                 defaultMessage(args: ValidationArguments) {
//                     return `${args.property} must be a number greater than or equal to 1`;
//                 },
//             },
//         });
//     };
// }
