/**
 * A utility type that recursively makes all properties of a given type `T` optional.
 * This allows for partial objects to be deeply nested within the original type `T`.
 *
 * @template T - The type for which all properties will be made optional recursively.
 *
 * @example
 * // Given an interface
 * interface User {
 *     name: string;
 *     address: {
 *         street: string;
 *         city: string;
 *     };
 * }
 *
 * // A DeepPartial<User> type
 * const partialUser: DeepPartial<User> = {
 *     name: "John Doe",
 *     address: {
 *         city: "New York"
 *     }
 * };
 * // The above is valid because all properties of `User` are optional.
 */

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
