import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { validateSync } from 'class-validator';

/**
 * Validates and transforms a configuration object based on a class schema.
 *
 * This function uses `class-transformer` to transform a plain object into an instance of a class
 * and `class-validator` to validate the instance. If validation fails, it throws an error with
 * detailed information about the validation errors.
 *
 * @template T - The type of the class used for validation.
 * @param {Record<string, unknown>} config - The configuration object to be validated.
 * @param {ClassConstructor<T>} envVariablesClass - The class constructor used for transforming and validating the configuration.
 * @returns {T} - The validated and transformed configuration object.
 * @throws {Error} - Throws an error if validation fails.
 *
 * @example
 * class Config {
 *   @IsString()
 *   @IsNotEmpty()
 *   DATABASE_URL: string;
 *
 *   @IsNumber()
 *   @IsPositive()
 *   PORT: number;
 * }
 *
 * const config = validateConfig(process.env, Config);
 * // Throws an error if any of the environment variables are invalid.
 */

function validateConfig<T extends object>(
    config: Record<string, unknown>,
    envVariablesClass: ClassConstructor<T>
) {
    const validatedConfig = plainToClass(envVariablesClass, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}

export default validateConfig;
