import { ApiProperty } from '@nestjs/swagger';

import { Exclude } from 'class-transformer';

export class Currency {
    @ApiProperty({
        type: String,
        description: 'Currency Code',
        example: 'INR',
    })
    code: string;

    @ApiProperty({
        type: String,
        description: 'name of currency',
        example: 'Indian Rupee',
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'plural name of currency',
        example: 'Indian rupees',
    })
    name_plural: string;

    @ApiProperty({
        type: String,
        description: 'Symbol of currency',
        example: '₹',
    })
    symbol: string;

    @ApiProperty({
        type: String,
        description: 'native symbol of currency',
        example: '₹',
    })
    symbol_native: string;

    @ApiProperty({
        type: Number,
        description: 'Decimal digits',
        example: '2',
    })
    decimal_digits: number;

    @ApiProperty({
        type: Number,
        description: 'Rounding',
        example: '0',
    })
    rounding: number;

    @Exclude({ toPlainOnly: true })
    id?: string;
}
