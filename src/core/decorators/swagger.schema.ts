import { ApiBody } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Custom decorator to document a single file upload in Swagger.
 *
 * @param {string} [fileName='file'] - The name of the file parameter.
 * @param {Partial<{ isRequired: boolean; isArray: boolean }>} [options={}] - Options to specify if the file is required and if it is an array.
 * @returns {MethodDecorator} - A method decorator for Swagger documentation.
 *
 * @example
 * // Usage in a controller method
 * @ApiFile('file', { isRequired: true })
 * @Post('upload')
 * uploadFile(@UploadedFile() file: Express.Multer.File) {
 *   // handle file
 * }
 */

export const ApiFile =
    (
        fileName = 'file',
        options: Partial<{ isRequired: boolean; isArray: boolean }> = {}
    ): MethodDecorator =>
    (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const { isRequired = false, isArray = false } = options;
        let fileSchema: SchemaObject = {
            type: 'string',
            format: 'binary',
        };

        if (isArray) {
            fileSchema = {
                type: 'array',
                items: fileSchema,
            };
        }
        return ApiBody({
            required: isRequired,
            schema: {
                type: 'object',
                properties: {
                    [fileName]: fileSchema,
                },
            },
        })(target, propertyKey, descriptor);
    };

/**
 * Custom decorator to document multiple file uploads in Swagger.
 *
 * @param {string} [fileName='files'] - The name of the files parameter.
 * @returns {MethodDecorator} - A method decorator for Swagger documentation.
 *
 * @example
 * // Usage in a controller method
 * @ApiMultiFile('files')
 * @Post('upload-multiple')
 * uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
 *   // handle files
 * }
 */

export const ApiMultiFile =
    (fileName = 'files'): MethodDecorator =>
    (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        ApiBody({
            type: 'multipart/form-data',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    [fileName]: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            },
        })(target, propertyKey, descriptor);
    };
