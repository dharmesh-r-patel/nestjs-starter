// validators/is-valid-field.validator.ts
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Custom decorator to validate if a field is a valid key of the provided entity class.
 *
 * @export
 * @param {Function} entity - The class constructor of the entity to check against.
 * @param {ValidationOptions} [validationOptions] - Optional validation options.
 * @returns {(object: object, propertyName: string) => void} - The decorator function.
 */

export function IsValidField(entity: any, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isValidField',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [entity],
            options: validationOptions,
            validator: {
                /**
                 * Validates whether the given value is a valid key of the provided entity class.
                 *
                 * @param {any} value - The value to validate.
                 * @param {ValidationArguments} args - Validation arguments including constraints.
                 * @returns {boolean} - Returns true if the value is a valid key; otherwise, false.
             
                */
                validate(value: any, args: ValidationArguments): boolean {
                    const [EntityClass] = args.constraints;
                    return value in new EntityClass();
                },

                /**
                 * Generates the default error message if validation fails.
                 *
                 * @param {ValidationArguments} args - Validation arguments including constraints.
                 * @returns {string} - The error message.
                 */
                defaultMessage(args: ValidationArguments): string {
                    const [EntityClass] = args.constraints;
                    return `Field '${args.value}' is not a valid key of ${EntityClass.name}`;
                },
            },
        });
    };
}
