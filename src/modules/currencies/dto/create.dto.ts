import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber, IsString, Min, MaxLength } from 'class-validator';

import { upperCaseTransformer } from '@utils/transformers/upper-case.transformer';

export class CreateDto {
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
