import { PaginationQueryDto } from '@utils/dto/pagination.dto';
import { IPaginationFieldConfig } from '@utils/types/pagination-options';

/**
 * UtilsService
 *
 * @description
 * `UtilsService` provides utility methods for building dynamic SQL queries, including pagination, filtering, sorting, and query construction.
 *
 * @export
 * @class UtilsService
 */
export class UtilsService {
    /**
     * Builds dynamic SQL queries based on pagination, filtering, sorting, and field configuration.
     *
     * @param {PaginationQueryDto} paginationQuery - The pagination query parameters including filters and sorting options.
     * @param {Record<string, IPaginationFieldConfig>} fieldConfigs - Configuration for each field including alias, join table, and select fields.
     * @param {string[]} baseFields - The base fields to include in the SELECT clause.
     * @param {string} fromQuery - The base FROM clause for the query.
     * @param {string} [countByField='*'] - The field to use for counting records in the count query.
     *
     * @returns {{
     *     selectQuery: string;
     *     countQuery: string;
     * }} - An object containing the dynamically built SELECT and COUNT queries.
     */

    public buildDynamicQuery(
        paginationQuery: PaginationQueryDto,
        fieldConfigs: Record<string, IPaginationFieldConfig>,
        baseFields: string[],
        fromQuery: string,
        countByField: string = '*'
    ): {
        selectQuery: string;
        countQuery: string;
    } {
        let filterQuery = '';
        let sortByQuery = '';
        const filterValues: any[] = [];
        const joinTables: string[] = [];
        const selectFields: string[] = [];

        const filters = paginationQuery.filters;
        const sort = paginationQuery.sort;

        const mySet = new Set<string>();

        if (filters && filters.length > 0) {
            const filterConditions = filters
                .map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (filter: { field: string; operator: string; value: string }, index: number) => {
                        const field = filter.field.toLowerCase();
                        let alias = `ptbl`; // default alias for the main table
                        if (fieldConfigs && fieldConfigs[field]) {
                            const config = fieldConfigs[field];
                            alias = config.alias();

                            if (!mySet.has(alias)) {
                                mySet.add(alias);
                                // joinTables.push(config.joinTable(index));
                                joinTables.push(config.joinTable(alias));
                            }
                            selectFields.push(...config.selectFields(alias));
                        }
                        const operator = filter.operator.toUpperCase();
                        if (operator === 'IN') {
                            const values = filter.value.split(',').map((val) => `'${val.trim()}'`);
                            return `${alias}.${filter.field} IN (${values.join(', ')})`;
                        }
                        // Add the value to the filterValues array for parameterized query
                        filterValues.push(filter.value);

                        // return `${alias}.${filter.field} ${filter.operator} ?`;
                        return `${alias}.${filter.field} ${filter.operator} '${filter.value}'`;
                    }
                )
                .join(' AND ');

            filterQuery = `WHERE ${filterConditions}`;
        }

        if (sort && sort.length > 0) {
            sortByQuery = `ORDER BY `;
            sortByQuery += sort
                .map((sortItem: { field: string; direction: any }) => {
                    const field = sortItem.field.toLowerCase();
                    let alias = `ptbl`; // default alias for the main table

                    if (fieldConfigs && fieldConfigs[field]) {
                        const config = fieldConfigs[field];
                        alias = config.alias(); // Use index 0 since sorting doesn't require multiple aliases
                    }

                    return `${alias}.${sortItem.field} ${sortItem.direction}`;
                })
                .join(', ');
        }

        const selectedFields = selectFields.length > 0 ? `${', '}${selectFields.join(', ')}` : [];

        // return { filterQuery, filterValues, joinTables, selectFields: selectedFields, sortByQuery };

        const { selectQuery, countQuery } = this.queryStatements(
            baseFields,
            selectedFields,
            fromQuery,
            joinTables,
            filterQuery,
            sortByQuery,
            countByField
        );

        return { selectQuery, countQuery };
    }

    /**
     * Constructs SELECT and COUNT SQL queries based on the provided parameters.
     *
     * @param {string[]} baseFields - The base fields to include in the SELECT clause.
     * @param {string | string[]} selectFields - Additional fields to include in the SELECT clause.
     * @param {string} fromQuery - The base FROM clause for the query.
     * @param {string[]} joinTables - JOIN clauses to include in the query.
     * @param {string} filterQuery - The WHERE clause for filtering.
     * @param {string} sortByQuery - The ORDER BY clause for sorting.
     * @param {string} [countByField='*'] - The field to use for counting records in the count query.
     *
     * @returns {{
     *     selectQuery: string;
     *     countQuery: string;
     * }} - An object containing the constructed SELECT and COUNT queries.
     */

    public queryStatements(
        baseFields: string[],
        selectFields: string | string[],
        fromQuery: string,
        joinTables: string[],
        filterQuery: string,
        sortByQuery: string,
        countByField: string = '*'
    ): {
        selectQuery: string;
        countQuery: string;
    } {
        const selectQuery = `SELECT ${baseFields.join(', ')} ${selectFields} ${fromQuery} ${joinTables.join(' ')} ${filterQuery} ${sortByQuery}`;
        const countQuery = `SELECT count(${countByField}) ${fromQuery} ${joinTables.join(' ')} ${filterQuery}`;

        return { selectQuery, countQuery };
    }
}
