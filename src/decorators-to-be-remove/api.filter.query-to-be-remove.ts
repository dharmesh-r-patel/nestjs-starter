import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import {
    FilterQueryDto,
    // ApiFilterQuery,
} from '@utils/dto/pagination.dto';

/**
 * Combines Swagger Decorators to create a description for `filters[name]=something`
 *  - has support for swagger
 *  - automatic transformation with nestjs
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function ApiFilterQuery(fieldName: string, filterDto: Function, index: number) {
    return applyDecorators(
        ApiExtraModels(filterDto),
        ApiQuery({
            required: false,
            name: `${fieldName}[${index}]`,
            style: 'deepObject',
            explode: true,
            type: 'object',
            schema: {
                $ref: getSchemaPath(filterDto),
            },
        }),
        Type(() => FilterQueryDto), // Ensure Type decorator is applied if using class-transformer
        IsArray(),
        ValidateNested({ each: true })
        // IsObject(), // Ensures filters is an array
        // ValidateNested({ each: true }) // Ensures each item in filters array is validated
    );
}

// // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types
// export function ApiFilterQuery(fieldName: string, filterDto: Function) {
//     return applyDecorators(
//         ApiExtraModels(filterDto),
//         ApiQuery({
//             required: false,
//             name: fieldName,
//             style: 'deepObject',
//             explode: true,
//             type: 'object',
//             schema: {
//                 $ref: getSchemaPath(filterDto),
//             },
//         })
//     );
// }

// refence from https://gist.github.com/MarZab/c6311f83dec6401966e847c55d81a9bb
// https://github.com/nestjs/swagger/issues/90

// Should be try
// import { applyDecorators } from '@nestjs/common';
// import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';

// // eslint-disable-next-line @typescript-eslint/ban-types
// export function ApiNestedQuery(p0: string, query: Function) {
//     const constructor = query.prototype;
//     const properties = Reflect.getMetadata('swagger/apiModelPropertiesArray', constructor).map(
//         (prop) => prop.substr(1)
//     );

//     const decorators = properties
//         .map((property) => {
//             const propertyType = Reflect.getMetadata('design:type', constructor, property);
//             return [
//                 ApiExtraModels(propertyType),
//                 ApiQuery({
//                     required: false,
//                     name: property,
//                     style: 'deepObject',
//                     explode: true,
//                     type: 'object',
//                     schema: {
//                         $ref: getSchemaPath(propertyType),
//                     },
//                 }),
//             ];
//         })
//         .flat();

//     return applyDecorators(...decorators);
// }

// // api-nested-query.decorator.ts

// import { applyDecorators } from '@nestjs/common';
// import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';

// // eslint-disable-next-line @typescript-eslint/ban-types
// export function ApiNestedQuery(query: Function) {
//     const constructor = query.prototype;
//     const properties = Reflect.getMetadata('swagger/apiModelPropertiesArray', constructor).map(
//         (prop) => prop.substr(1)
//     );

//     const decorators = properties
//         .map((property) => {
//             const propertyType = Reflect.getMetadata('design:type', constructor, property);
//             return [
//                 ApiExtraModels(propertyType),
//                 ApiQuery({
//                     required: false,
//                     name: property,
//                     style: 'deepObject',
//                     explode: true,
//                     type: 'object',
//                     schema: {
//                         $ref: getSchemaPath(propertyType),
//                     },
//                 }),
//             ];
//         })
//         .flat();

//     return applyDecorators(...decorators);
// }

// import { applyDecorators } from '@nestjs/common';
// import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';

// // eslint-disable-next-line @typescript-eslint/ban-types
// export function ApiNestedQuery(query: Function) {
//     const constructor = query.prototype;
//     const properties = Reflect.getMetadata('swagger/apiModelPropertiesArray', constructor).map(
//         (prop) => prop.substr(1)
//     );

//     const decorators = properties.map((property) => {
//         const propertyType = Reflect.getMetadata('design:type', constructor, property);
//         return ApiQuery({
//             required: false,
//             name: property,
//             style: 'deepObject',
//             explode: true,
//             type: 'array',
//             schema: {
//                 items: {
//                     $ref: getSchemaPath(propertyType),
//                 },
//             },
//         });
//     });

//     return applyDecorators(ApiExtraModels(query), ...decorators);
// }

// import { applyDecorators } from '@nestjs/common';
// import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';

// // eslint-disable-next-line @typescript-eslint/ban-types
// export function ApiNestedQuery(query: Function) {
//     const constructor = query.prototype;
//     const properties = Reflect.getMetadata('swagger/apiModelPropertiesArray', constructor).map(
//         (prop) => prop.substr(1)
//     );

//     const decorators = properties
//         .map((property) => {
//             const propertyType = Reflect.getMetadata('design:type', constructor, property);
//             return [
//                 ApiExtraModels(propertyType),
//                 ApiQuery({
//                     required: false,
//                     name: property,
//                     style: 'deepObject',
//                     explode: true,
//                     type: 'object',
//                     schema: {
//                         $ref: getSchemaPath(propertyType),
//                     },
//                 }),
//             ];
//         })
//         .flat();

//     return applyDecorators(...decorators);
// }
