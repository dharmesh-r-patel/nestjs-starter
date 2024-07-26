import { TransformFnParams } from 'class-transformer/types/interfaces';

import { MaybeType } from '../types/maybe.type';

/**
 * Transforms a string value to uppercase and trims any whitespace from it.
 * If the input value is `null` or `undefined`, it returns the same value.
 *
 * @param {TransformFnParams} params - The parameters used for transformation.
 * @param {any} params.value - The value to be transformed.
 * @returns {MaybeType<string>} The transformed value in uppercase, or the original value if it's `null` or `undefined`.
 *
 * @example
 * // Given a value of "  Hello World  "
 * upperCaseTransformer({ value: "  Hello World  " });
 * // Returns: "HELLO WORLD"
 *
 * @example
 * // Given a value of null
 * upperCaseTransformer({ value: null });
 * // Returns: null
 */

export const upperCaseTransformer = (params: TransformFnParams): MaybeType<string> =>
    params.value?.toUpperCase().trim();
