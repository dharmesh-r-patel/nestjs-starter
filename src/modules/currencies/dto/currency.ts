import { ApiProperty } from '@nestjs/swagger';

import { Exclude } from 'class-transformer';

/**
 * @fileoverview
 * This file defines the `Currency` class, which represents the data structure of a currency entity.
 * It includes properties that describe the currency and uses decorators for Swagger documentation
 * and data transformation.
 *
 * @module
 * @description
 * The `Currency` class is used to define the structure of a currency object, including its code, name,
 * plural name, symbol, native symbol, decimal digits, and rounding. The class also uses decorators
 * to configure how the properties should be documented and transformed.
 */
export class Currency {
    /**
     * The code of the currency (e.g., 'INR').
     * @example 'INR'
     */

    @ApiProperty({
        type: String,
        description: 'Currency Code',
        example: 'INR',
    })
    code: string;

    /**
     * The name of the currency (e.g., 'Indian Rupee').
     * @example 'Indian Rupee'
     */

    @ApiProperty({
        type: String,
        description: 'name of currency',
        example: 'Indian Rupee',
    })
    name: string;

    /**
     * The plural name of the currency (e.g., 'Indian rupees').
     * @example 'Indian rupees'
     */

    @ApiProperty({
        type: String,
        description: 'plural name of currency',
        example: 'Indian rupees',
    })
    name_plural: string;

    /**
     * The symbol of the currency (e.g., '₹').
     * @example '₹'
     */

    @ApiProperty({
        type: String,
        description: 'Symbol of currency',
        example: '₹',
    })
    symbol: string;

    /**
     * The native symbol of the currency (e.g., '₹').
     * @example '₹'
     */

    @ApiProperty({
        type: String,
        description: 'native symbol of currency',
        example: '₹',
    })
    symbol_native: string;

    /**
     * The number of decimal digits used for the currency.
     * @example 2
     */

    @ApiProperty({
        type: Number,
        description: 'Decimal digits',
        example: '2',
    })
    decimal_digits: number;

    /**
     * The rounding precision used for the currency.
     * @example 0
     */

    @ApiProperty({
        type: Number,
        description: 'Rounding',
        example: '0',
    })
    rounding: number;

    /**
     * The unique identifier for the currency.
     * This property is excluded from the plain representation of the object.
     */

    @Exclude({ toPlainOnly: true })
    id?: string;
}
