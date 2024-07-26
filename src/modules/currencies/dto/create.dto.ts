import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber, IsString, Min, MaxLength } from 'class-validator';

import { upperCaseTransformer } from '@utils/transformers/upper-case.transformer';

/**
 * @fileoverview
 * This file defines the `CreateDto` class, which represents the data transfer object (DTO)
 * used for creating a new currency record. It includes validation rules and transformation logic
 * for the properties of the currency.
 *
 * @module
 * @description
 * The `CreateDto` class ensures that the data provided for creating a currency adheres to
 * specified validation rules and formats. It uses decorators from `class-validator` for validation
 * and `class-transformer` for transforming input data.
 */

export class CreateDto {
    /**
     * Currency code, which must be uppercase and 3 characters long.
     * @example 'INR'
     */

    @Transform(upperCaseTransformer)
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(3)
    @ApiProperty({
        type: String,
        description: 'Currency Code',
        example: 'INR',
        maxLength: 3,
    })
    readonly code: string;

    /**
     * Name of the currency.
     * @example 'Indian Rupee'
     */

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    @ApiProperty({
        type: String,
        description: 'name of currency',
        example: 'Indian Rupee',
        maxLength: 80,
    })
    name: string;

    /**
     * Plural name of the currency.
     * @example 'Indian rupees'
     */

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    @ApiProperty({
        type: String,
        description: 'plural name of currency',
        example: 'Indian rupees',
        maxLength: 80,
    })
    name_plural: string;

    /**
     * Symbol of the currency, which can be up to 6 characters long.
     * @example '₹'
     */

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(6)
    @ApiProperty({
        type: String,
        description: 'Symbol of currency',
        example: '₹',
        maxLength: 6,
    })
    symbol: string;

    /**
     * Native symbol of the currency, which can be up to 10 characters long.
     * @example '₹'
     */

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    @ApiProperty({
        type: String,
        description: 'native symbol of currency',
        example: '₹',
        maxLength: 10,
    })
    symbol_native: string;

    /**
     * Number of decimal digits used for the currency.
     * @example 2
     */

    @IsDefined()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @ApiProperty({
        type: Number,
        description: 'Decimal digits',
        example: '2',
    })
    readonly decimal_digits: number;

    /**
     * Rounding precision used for the currency.
     * @example 0
     */

    @IsDefined()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @ApiProperty({
        type: Number,
        description: 'Rounding',
        example: '0',
    })
    readonly rounding: number;
}
