/* tslint:disable:naming-convention */

import { Transform } from 'class-transformer';

/**
 * Decorator that converts a string number or number to an integer.
 *
 * @description This decorator uses `class-transformer` to transform a string representation of a number or a number into an integer. If the transformation results in `NaN`, it returns `'undefined'`.
 *
 * @example
 * ```typescript
 * import { ToNumber } from './path/to/decorator';
 *
 * class ExampleClass {
 *   @ToNumber()
 *   public value: number;
 * }
 * ```
 *
 * @returns {(target: any, key: string) => void} - A property decorator function.
 */

export function ToNumber(): (target: any, key: string) => void {
    return Transform(({ value }) => {
        const strippedValue = String(value).replace(/['"]+/g, '');
        const numberValue = Number(strippedValue);
        return isNaN(numberValue) ? 'undefined' : numberValue;
    });
}
