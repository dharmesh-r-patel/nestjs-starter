/* tslint:disable:naming-convention */

import { Transform } from 'class-transformer';

/**
 * @description convert string number or number to integer
 * @example
 * @ToNumber()
 * name: number;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export function ToNumber(): (target: any, key: string) => void {
    return Transform(({ value }) => {
        const strippedValue = String(value).replace(/['"]+/g, '');
        const numberValue = Number(strippedValue);
        return isNaN(numberValue) ? 'undefined' : numberValue;
    });
}
