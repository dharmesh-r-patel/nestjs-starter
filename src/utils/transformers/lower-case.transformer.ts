import { TransformFnParams } from 'class-transformer/types/interfaces';

import { MaybeType } from '../types/maybe.type';

/**
 * Transforms a string value to lowercase and trims any whitespace from it.
 * If the input value is `null` or `undefined`, it returns the same value.
 *
 * @param {TransformFnParams} params - The parameters used for transformation.
 * @param {any} params.value - The value to be transformed.
 * @returns {MaybeType<string>} The transformed value in lowercase, or the original value if it's `null` or `undefined`.
 *
 * @example
 * // Given a value of "  Hello World  "
 * lowerCaseTransformer({ value: "  Hello World  " });
 * // Returns: "hello world"
 *
 * @example
 * // Given a value of null
 * lowerCaseTransformer({ value: null });
 * // Returns: null
 */

export const lowerCaseTransformer = (params: TransformFnParams): MaybeType<string> =>
    params.value?.toLowerCase().trim();
