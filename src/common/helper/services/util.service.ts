import { PaginationQueryDto } from '@utils/dto/pagination.dto';
import { IPaginationFieldConfig } from '@utils/types/pagination-options';

export class UtilsService {
    public buildDynamicQuery(
        paginationQuery: PaginationQueryDto,
        fieldConfigs: Record<string, IPaginationFieldConfig>,
        baseFields: string[],
        fromQuery: string,
        countByField: string = '*'
    ) {
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

    public queryStatements(
        baseFields: string[],
        selectFields: string | string[],
        fromQuery: string,
        joinTables: string[],
        filterQuery: string,
        sortByQuery: string,
        countByField: string = '*'
    ) {
        const selectQuery = `SELECT ${baseFields.join(', ')} ${selectFields} ${fromQuery} ${joinTables.join(' ')} ${filterQuery} ${sortByQuery}`;
        const countQuery = `SELECT count(${countByField}) ${fromQuery} ${joinTables.join(' ')} ${filterQuery}`;

        return { selectQuery, countQuery };
    }
}
