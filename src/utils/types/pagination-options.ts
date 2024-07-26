/**
 * Interface for configuring pagination fields in a query.
 *
 * This interface provides a contract for configuring how fields should be handled when constructing
 * pagination queries, including specifying the table to join, generating an alias, and selecting fields.
 *
 * @interface IPaginationFieldConfig
 */

export interface IPaginationFieldConfig {
    /**
     * The table to join for pagination queries.
     *
     * @type {any}
     */

    joinTable: any;

    /**
     * A function that returns an alias for the table.
     *
     * @returns {string} - The alias for the table.
     */

    alias: () => string;

    /**
     * A function that returns an array of field names to select based on the provided alias.
     *
     * @param {string} alias - The alias for the table.
     * @returns {string[]} - An array of field names to select.
     */

    selectFields: (alias: string) => string[];
}
