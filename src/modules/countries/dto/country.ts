import { ApiResponseProperty } from '@nestjs/swagger';

/**
 * @fileoverview
 * This file defines the `Country` class, which represents the data structure of a country
 * entity used in the application. The `Country` class is used to describe various details
 * about a country, including its identification, name, ISO codes, and other related attributes.
 *
 * @module
 * @description
 * The `Country` class serves as a Data Transfer Object (DTO) for representing country data.
 * It includes properties such as the country's ID, name, ISO codes, dial code, capital city,
 * continent, currency details, and timezone information. Each property is annotated with `@ApiResponseProperty`
 * to define its type and provide example values for API documentation purposes.
 */

export class Country {
    /**
     * The unique identifier for the country.
     *
     * @type {string}
     * @example '123e4567-e89b-12d3-a456-426614174000'
     */

    @ApiResponseProperty({
        type: String,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id_country: string;

    /**
     * The name of the country.
     *
     * @type {string}
     * @example 'India'
     */

    @ApiResponseProperty({
        type: String,
        example: 'India',
    })
    name: string;

    /**
     * The ISO 3166-1 alpha-2 code of the country.
     *
     * @type {string}
     * @example 'IN'
     */

    @ApiResponseProperty({
        type: String,
        example: 'IN',
    })
    iso: string;

    /**
     * The ISO 3166-1 alpha-3 code of the country.
     *
     * @type {string}
     * @example 'IND'
     */

    @ApiResponseProperty({
        type: String,
        example: 'IND',
    })
    iso3: string;

    /**
     * The international dialing code for the country.
     *
     * @type {string}
     * @example '91'
     */

    @ApiResponseProperty({
        type: String,
        example: '91',
    })
    dial_code: string;

    /**
     * The capital city of the country.
     *
     * @type {string}
     * @example 'New Delhi'
     */

    @ApiResponseProperty({
        type: String,
        example: 'New Delhi',
    })
    capital: string;

    /**
     * The continent where the country is located.
     *
     * @type {string}
     * @example 'Asia'
     */

    @ApiResponseProperty({
        type: String,
        example: 'Asia',
    })
    continent: string;

    /**
     * The symbol used for the country's currency.
     *
     * @type {string}
     * @example '₹'
     */

    @ApiResponseProperty({
        type: String,
        example: 'currency symbol ₹, $ etc',
    })
    symbol: string;

    /**
     * The name of the currency used in the country.
     *
     * @type {string}
     * @example 'Indian Rupee'
     */

    @ApiResponseProperty({
        type: String,
        example: 'Indian Rupee, US Dollar etc',
    })
    currency_name: string;

    /**
     * The timezone value of the country.
     *
     * @type {string}
     * @example 'Asia/Mumbai'
     */

    @ApiResponseProperty({
        type: String,
        example: 'Asia/Mumbai',
    })
    value: string;

    /**
     * The timezone offset from UTC.
     *
     * @type {string}
     * @example '+5:30'
     */

    @ApiResponseProperty({
        type: String,
        example: '+5:30',
    })
    offset: string;

    /**
     * The timezone offset in minutes from UTC.
     *
     * @type {number}
     * @example 330
     */

    @ApiResponseProperty({
        type: String,
        example: '270',
    })
    offset_in_minutes: number;

    /**
     * The abbreviation for the timezone.
     *
     * @type {string}
     * @example 'IST'
     */

    @ApiResponseProperty({
        type: String,
        example: 'IST',
    })
    abbr: string;

    /**
     * The descriptive name of the timezone.
     *
     * @type {string}
     * @example 'Indian Time'
     */

    @ApiResponseProperty({
        type: String,
        example: 'Indian Time',
    })
    text: string;
}
