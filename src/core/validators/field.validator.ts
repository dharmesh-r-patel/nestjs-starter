// validators/is-valid-field.validator.ts
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidField(entity: any, validationOptions?: ValidationOptions) {
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
    return function (object: object, propertyName: string) {
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
        registerDecorator({
            name: 'isValidField',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [entity],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [EntityClass] = args.constraints;
                    return value in new EntityClass();
                },
                defaultMessage(args: ValidationArguments) {
                    const [EntityClass] = args.constraints;
                    return `Field '${args.value}' is not a valid key of ${EntityClass.name}`;
                },
            },
        });
    };
}
