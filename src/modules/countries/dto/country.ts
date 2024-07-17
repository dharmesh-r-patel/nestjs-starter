import { ApiResponseProperty } from '@nestjs/swagger';

export class Country {
    @ApiResponseProperty({
        type: String,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id_country: string;

    @ApiResponseProperty({
        type: String,
        example: 'India',
    })
    name: string;

    @ApiResponseProperty({
        type: String,
        example: 'IN',
    })
    iso: string;

    @ApiResponseProperty({
        type: String,
        example: 'IND',
    })
    iso3: string;

    @ApiResponseProperty({
        type: String,
        example: '91',
    })
    dial_code: string;

    @ApiResponseProperty({
        type: String,
        example: 'New Delhi',
    })
    capital: string;

    @ApiResponseProperty({
        type: String,
        example: 'Asia',
    })
    continent: string;

    @ApiResponseProperty({
        type: String,
        example: 'currency symbol ₹, $ etc',
    })
    symbol: string;

    @ApiResponseProperty({
        type: String,
        example: 'Indian Rupee, US Dollar etc',
    })
    currency_name: string;

    @ApiResponseProperty({
        type: String,
        example: 'Asia/Mumbai',
    })
    value: string;

    @ApiResponseProperty({
        type: String,
        example: '+5:30',
    })
    offset: string;

    @ApiResponseProperty({
        type: String,
        example: '270',
    })
    offset_in_minutes: number;

    @ApiResponseProperty({
        type: String,
        example: 'IST',
    })
    abbr: string;

    @ApiResponseProperty({
        type: String,
        example: 'Indian Time',
    })
    text: string;
}
