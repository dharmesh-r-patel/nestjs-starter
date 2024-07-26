/**
 * A utility type that represents a type `T` that may be either of type `T` or `undefined`.
 * This is useful for cases where a value may or may not be present.
 *
 * @template T - The type that may be present or undefined.
 *
 * @example
 * // Given a type
 * type User = {
 *     name: string;
 *     age: number;
 * };
 *
 * // A MaybeType<User> type
 * const user: MaybeType<User> = undefined;
 * const anotherUser: MaybeType<User> = {
 *     name: "Jane Doe",
 *     age: 30
 * };
 * // The above are both valid because `MaybeType<User>` allows `undefined` or `User`.
 */

export type MaybeType<T> = T | undefined;
