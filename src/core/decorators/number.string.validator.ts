// isOptionalIntMinOne.decorator.ts

import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNumberStringOrNumber(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'IsOptionalIntMinOne',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validate(value: any, args: ValidationArguments) {
                    const strippedValue = String(value).replace(/['"]+/g, '');
                    const numberValue = Number(strippedValue);
                    return (
                        typeof numberValue === 'number' && !isNaN(numberValue) && numberValue >= 1
                    );
                },
                defaultMessage(args: ValidationArguments) {
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
