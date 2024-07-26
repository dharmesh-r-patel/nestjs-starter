import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type, Transform, plainToInstance } from 'class-transformer';
import {
    IsOptional,
    Min,
    Max,
    IsNotEmpty,
    IsString,
    ValidateNested,
    Matches,
    IsEnum,
    // Validate,
    // IsIn,
} from 'class-validator';

// import { IsValidField } from '@core/validators/field.validator'; // Import the custom validator
import { IsNumberStringOrNumber } from '@decorators/number.string.validator';
import { ToNumber } from '@decorators/transforms.decorator';
// import { IsNumberStringOrNumber } from '@decorators/number.string.validator';
// import { ToNumber } from '@decorators/transforms.decorator';
// import { Country } from '@modules/countries/dto/country';

/**
 * Enum representing different pagination types.
 *
 * @export
 * @enum {string}
 */

export enum PaginationType {
    NONE = 'no',
    INFINITY = 'infinity',
    PAGINATE = 'paginate',
    ALL = 'all',
}

/**
 * DTO class for pagination query parameters.
 *
 * @export
 */
export class PaginationQueryDto {
    /**
     * The type of pagination to apply.
     *
     * @type {PaginationType}
     * @memberof PaginationQueryDto
     */

    @ApiPropertyOptional({
        description:
            'Pagination must all (Page and has_next_page), infinity (only has_next_page), paginate(only page)',
        enum: PaginationType,
        default: PaginationType.ALL,
    })
    @IsEnum(PaginationType)
    @IsOptional()
    readonly pagination: PaginationType;

    /**
     * The page number for pagination.
     *
     * @type {number}
     * @memberof PaginationQueryDto
     */

    @ApiPropertyOptional({
        description: 'Page number',
        minimum: 1,
        default: 1,
    })
    @IsOptional()
    @IsNumberStringOrNumber()
    @ToNumber()
    @Min(1)
    readonly page?: number;

    /**
     * The number of records per page.
     *
     * @type {number}
     * @memberof PaginationQueryDto
     */

    @ApiPropertyOptional({
        description: 'Record limit',
        minimum: 1,
        maximum: 500,
        default: 10,
    })
    @IsOptional()
    @IsNumberStringOrNumber()
    @ToNumber()
    @Min(10)
    @Max(500)
    readonly limit?: number = 10;

    /**
     * Filters to apply to the query.
     *
     * @type {FilterQueryDto[] | null}
     * @memberof PaginationQueryDto
     */

    @ApiPropertyOptional({
        name: 'filters',
        required: false,
        type: String,
        description: 'Array of filter objects as a JSON string',
        example: '[{"field":"name","operator":"=","value":"IN"}]',
    })
    @IsOptional()
    @Transform(({ value }) => {
        return value ? plainToInstance(FilterQueryDto, JSON.parse(value)) : undefined;
    })
    @ValidateNested({ each: true })
    @Type(() => FilterQueryDto)
    filters?: FilterQueryDto[] | null;

    /**
     * Sorting options for the query.
     *
     * @type {SortByDto[] | null}
     * @memberof PaginationQueryDto
     */

    @ApiPropertyOptional({
        name: 'sort',
        required: false,
        type: String,
        description: 'Array of sort objects as a JSON string',
        example: '[{"field":"name","direction":"ASC"}]',
    })
    @IsOptional()
    @Transform(({ value }) => {
        return value ? plainToInstance(SortByDto, JSON.parse(value)) : undefined;
    })
    @ValidateNested({ each: true })
    @Type(() => SortByDto)
    sort?: SortByDto[] | null;
}

/**
 * DTO class for filter query parameters.
 *
 * @export
 */
export class FilterQueryDto {
    /**
     * The field to filter on.
     *
     * @type {string}
     * @memberof FilterQueryDto
     */

    @ApiProperty({ example: 'iso', required: true })
    @IsNotEmpty()
    @IsString()
    field: string;

    /**
     * The operator to use for filtering.
     *
     * @type {string}
     * @memberof FilterQueryDto
     */

    @ApiProperty({ example: '=' })
    @IsNotEmpty()
    @IsString()
    operator: string;

    /**
     * The value to filter by.
     *
     * @type {string}
     * @memberof FilterQueryDto
     */

    @ApiProperty({ example: 'IN' })
    @IsNotEmpty()
    @IsString()
    value: string;
}

/**
 * DTO class for sorting options.
 *
 * @export
 */
export class SortByDto {
    // @ApiProperty({ example: 'name' })
    // @IsString()
    // @Validate(IsValidField, [Country], {
    //     message: 'Field must be a valid key of Country',
    // })
    // field: keyof Country;
    /**
     * The field to sort by.
     *
     * @type {string}
     * @memberof SortByDto
     */

    @ApiProperty()
    @IsString()
    // @IsIn(abc(x : keyof TExposedAccountInfo), {
    //     message: 'Field must be one of "name", "age", or "status"',
    // })
    // @Validate(IsValidField, [{ entity: () => T }], {
    //     message: 'Field must be a valid key of the specified entity',
    // })
    field: string;

    /**
     * The direction of the sort (ascending or descending).
     *
     * @type {string}
     * @memberof SortByDto
     */

    @ApiProperty({ example: 'ASC' })
    @IsString()
    @Matches(/^(ASC|DESC|asc|desc)$/, {
        message: 'operator must be one of ASC, DESC, asc, or desc',
    })
    direction: string;
}

// export class PaginatedResultDto<T> {
//     @ApiProperty()
//     data: T[];

//     @ApiProperty()
//     total: number;

//     @ApiProperty()
//     page: number;

//     @ApiProperty()
//     limit: number;
// }

//DX
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// import { Type, Transform, plainToInstance } from 'class-transformer';
// import {
//     IsOptional,
//     Min,
//     Max,
//     IsNotEmpty,
//     IsString,
//     IsArray,
//     ValidateNested,
//     Validate,
//     Matches,
// } from 'class-validator';

// import { IsNumberStringOrNumber } from '@decorators/number.string.validator';
// import { ToNumber } from '@decorators/transforms.decorator';
// import { SortBy } from '@validators/filter.validator';

// export class FilterQueryDto {
//     @ApiProperty({ example: 'name', required: true })
//     @IsNotEmpty()
//     @IsString()
//     field: string;

//     @ApiProperty({ example: 'LIKE' })
//     @IsNotEmpty()
//     @IsString()
//     operator: string;

//     @ApiProperty({ example: '%John%' })
//     @IsNotEmpty()
//     @IsString()
//     value: string;
// }

// export class SortByDto {
//     @ApiProperty({ example: 'name' })
//     @IsString()
//     field: string;

//     @ApiProperty({ example: 'ASC' })
//     @IsString()
//     @Matches(/^(ASC|DESC|asc|desc)$/, {
//         message: 'operator must be one of ASC, DESC, asc, or desc',
//     })
//     direction: string;
// }

// export class PaginationQueryDto {
//     @ApiPropertyOptional({
//         description: 'Page number',
//         minimum: 1,
//         default: 1,
//     })
//     @IsOptional()
//     @IsNumberStringOrNumber()
//     @ToNumber()
//     @Min(1)
//     // @Transform(({ value }) => {
//     //     const strippedValue = String(value).replace(/['"]+/g, '');
//     //     const numberValue = Number(strippedValue);
//     //     return isNaN(numberValue) ? 'undefined' : numberValue;
//     // })
//     readonly page?: number;

//     @ApiPropertyOptional({
//         description: 'Record limit',
//         minimum: 1,
//         maximum: 500,
//         default: 10,
//     })
//     @IsOptional()
//     @IsNumberStringOrNumber()
//     @ToNumber()
//     @Min(10)
//     @Max(500)
//     readonly limit?: number = 10;

//     // @IsOptional()
//     // @IsArray()
//     // @ValidateNested({ each: true })
//     // @Type(() => FilterQueryDto)
//     // filters?: FilterQueryDto[];
//     // // filters?: any;
//     @ApiPropertyOptional({
//         name: 'filters',
//         required: false,
//         type: String,
//         description: 'Array of filter objects as a JSON string',
//         example:
//             '[{"field":"name","operator":"LIKE","value":"John"},{"field":"age","operator":">","value":"30"}]',
//     })
//     @IsOptional()
//     @Transform(({ value }) => {
//         return value ? plainToInstance(FilterQueryDto, JSON.parse(value)) : undefined;
//     })
//     @ValidateNested({ each: true })
//     @Type(() => FilterQueryDto)
//     filters?: FilterQueryDto[] | null;

//     // @ApiPropertyOptional({
//     //     description: '<SortBy Column> Name or City: <Order> ASC or DESC',
//     //     example: 'name ASC',
//     // })
//     // @IsOptional()
//     // @IsString()
//     // @Validate(SortBy)
//     // readonly sort?: string;
//     // @ApiPropertyOptional({ type: [SortByDto], isArray: true })
//     // @IsOptional()
//     // @Transform(({ value }) => {
//     //     return value ? plainToInstance(SortUserDto, JSON.parse(value)) : undefined;
//     // })
//     // @ValidateNested({ each: true })
//     // @Type(() => SortUserDto)
//     // sort?: SortUserDto[] | null;

//     @ApiPropertyOptional({
//         name: 'sort',
//         required: false,
//         type: String,
//         description: 'Array of sort objects as a JSON string',
//         example: '[{"field":"name","direction":"ASC"},{"field":"age","direction":"DESC"}]',
//     })
//     @IsOptional()
//     @Transform(({ value }) => {
//         return value ? plainToInstance(SortByDto, JSON.parse(value)) : undefined;
//     })
//     @ValidateNested({ each: true })
//     @Type(() => SortByDto)
//     sort?: SortByDto[] | null;
// }

// export class PaginatedResultDto<T> {
//     @ApiProperty()
//     data: T[];

//     @ApiProperty()
//     total: number;

//     @ApiProperty()
//     page: number;

//     @ApiProperty()
//     limit: number;
// }

// // import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

// // import { Type } from 'class-transformer';
// // import { IsOptional, IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';

// // // export class FilterQueryDto {
// // //     @ApiProperty({ example: 'name' })
// // //     field: string;

// // //     @ApiProperty({ example: 'LIKE' })
// // //     operator: string;

// // //     @ApiProperty({ example: '%John%' })
// // //     value: string;
// // // }
// // export class FilterQueryDto {
// //     @ApiProperty({ example: 'country_name' })
// //     @IsString()
// //     field: string;

// //     @ApiProperty({ example: 'LIKE' })
// //     @IsString()
// //     operator: string;

// //     @ApiProperty({ example: '%United%' })
// //     @IsString()
// //     value: string;
// // }
// // @ApiExtraModels(FilterQueryDto)
// // export class PaginationQueryDto {
// //     @ApiProperty({ example: 1, required: false })
// //     @IsOptional()
// //     @IsNumber()
// //     @Type(() => Number)
// //     page?: number = 1;

// //     @ApiProperty({ example: 10, required: false })
// //     @IsOptional()
// //     @IsNumber()
// //     @Type(() => Number)
// //     limit?: number = 10;

// //     // @ApiProperty({
// //     //     type: [FilterQueryDto],
// //     //     required: false,
// //     //     isArray: true,
// //     // })
// //     // @Type(() => FilterQueryDto)
// //     // filters?: FilterQueryDto[];
// //     @ApiProperty({
// //         type: FilterQueryDto,
// //         required: false,
// //         isArray: true,
// //     })
// //     // @IsOptional()
// //     @IsArray()
// //     @ValidateNested({ each: true })
// //     @Type(() => FilterQueryDto)
// //     filters?: FilterQueryDto[];

// //     // @ApiProperty({
// //     //     type: [Object],
// //     //     // items: {
// //     //     //     type: 'object',
// //     //     //     items: {
// //     //     //         type: 'object',
// //     //     //     },
// //     //     // },
// //     // })
// //     // coords: FilterQueryDto[];

// //     // @ApiProperty({ type: String, required: false })
// //     // @IsOptional()
// //     // @IsArray()
// //     // @ValidateNested({ each: true })
// //     // @Type(() => FilterQueryDto)
// //     // filters?: FilterQueryDto[];

// //     @ApiProperty({ example: 'name ASC1', required: false })
// //     sort?: string;
// // }

// // // export class PaginationQueryDto {
// // //     @ApiProperty({ example: 1, required: false })
// // //     page?: number = 1;

// // //     @ApiProperty({ example: 10, required: false })
// // //     limit?: number = 10;

// // //     // @ApiProperty({ type: [FilterQueryDto], required: false, isArray: true })
// // //     // filters?: FilterQueryDto[];

// // //     // @ApiProperty({ type: String, required: false, isArray: true })
// // //     // filters?: FilterQueryDto[];

// // //     // @ApiProperty({ type: [FilterQueryDto], required: false, isArray: true })
// // //     // @Type(() => FilterQueryDto)
// // //     // filters?: FilterQueryDto[];

// // //     @ApiProperty({ type: [FilterQueryDto], required: false })
// // //     @IsOptional()
// // //     @IsArray()
// // //     @ValidateNested({ each: true })
// // //     @Type(() => FilterQueryDto)
// // //     filters?: FilterQueryDto[];

// // //     @ApiProperty({ example: 'name ASC1', required: false })
// // //     sort?: string;
// // // }

// // export class PaginatedResultDto<T> {
// //     @ApiProperty()
// //     data: T[];

// //     @ApiProperty()
// //     total: number;

// //     @ApiProperty()
// //     page: number;

// //     @ApiProperty()
// //     limit: number;
// // }

// // export class abc {
// //     @ApiProperty()
// //     page: number;

// //     @ApiProperty()
// //     limit: number;
// // }

// // import { applyDecorators } from '@nestjs/common';
// // import { ApiProperty, ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';

// // /**
// //  * Combines Swagger Decorators to create a description for `filters[name]=something`
// //  *  - has support for swagger
// //  *  - automatic transformation with nestjs
// //  */
// // // // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types
// // // export function ApiFilterQuery(fieldName: string, filterDto: Function) {
// // //     return applyDecorators(
// // //         ApiExtraModels(filterDto),
// // //         ApiQuery({
// // //             required: false,
// // //             name: fieldName,
// // //             style: 'deepObject',
// // //             explode: true,
// // //             type: 'object',
// // //             schema: {
// // //                 $ref: getSchemaPath(filterDto),
// // //             },
// // //         })
// // //     );
// // // }
// // // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types
// // export function ApiFilterQuery(fieldName: string, filterDto: Function, index: number) {
// //     return applyDecorators(
// //         ApiExtraModels(filterDto),
// //         ApiQuery({
// //             required: false,
// //             name: `${fieldName}[${index}]`,
// //             style: 'deepObject',
// //             explode: true,
// //             type: 'object',
// //             schema: {
// //                 $ref: getSchemaPath(filterDto),
// //             },
// //         })
// //     );
// // }

// // export function ApiFilterQuery(fieldName: string, index: number) {
// //     return applyDecorators(
// //         ApiQuery({
// //             required: false,
// //             name: `${fieldName}[${index}].field`,
// //             style: 'deepObject',
// //             explode: true,
// //             type: 'object',
// //         }),
// //         ApiQuery({
// //             required: false,
// //             name: `${fieldName}[${index}].operator`,
// //             style: 'deepObject',
// //             explode: true,
// //             type: 'object',
// //         }),
// //         ApiQuery({
// //             required: false,
// //             name: `${fieldName}[${index}].value`,
// //             style: 'deepObject',
// //             explode: true,
// //             type: 'object',
// //         })
// //     );
// // }
