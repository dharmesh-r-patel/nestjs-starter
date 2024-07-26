/**
 * Recursively resolves all nested promises in an object or array.
 *
 * This function takes an input that can be a promise, an array, an object, or a primitive value,
 * and recursively resolves any promises contained within. It supports nested structures and
 * preserves the original structure of the input while resolving promises.
 *
 * @param {Promise<any> | any[] | object | Date | any} input - The input to process, which may include promises.
 * @returns {Promise<any[]> | Promise<object> | Promise<Date> | any} - A promise that resolves to the input with all promises resolved.
 *
 * @example
 * // Example usage with promises in an array
 * const data = [Promise.resolve(1), Promise.resolve([2, Promise.resolve(3)])];
 * deepResolvePromises(data).then(result => {
 *     console.log(result); // Output: [1, [2, 3]]
 * });
 *
 * @example
 * // Example usage with promises in an object
 * const obj = {
 *     a: Promise.resolve(1),
 *     b: {
 *         c: Promise.resolve(2),
 *         d: [Promise.resolve(3), 4]
 *     }
 * };
 * deepResolvePromises(obj).then(result => {
 *     console.log(result); // Output: { a: 1, b: { c: 2, d: [3, 4] } }
 * });
 */

async function deepResolvePromises(input) {
    if (input instanceof Promise) {
        return await input;
    }

    if (Array.isArray(input)) {
        const resolvedArray = await Promise.all(input.map(deepResolvePromises));
        return resolvedArray;
    }

    if (input instanceof Date) {
        return input;
    }

    if (typeof input === 'object' && input !== null) {
        const keys = Object.keys(input);
        const resolvedObject = {};

        for (const key of keys) {
            const resolvedValue = await deepResolvePromises(input[key]);
            resolvedObject[key] = resolvedValue;
        }

        return resolvedObject;
    }

    return input;
}

export default deepResolvePromises;
