import { PaginationQueryDto } from '@utils/dto/pagination.dto';
import { IPaginationFieldConfig } from '@utils/types/pagination-options';

export class UtilsService {
    public buildDynamicQuery(
        paginationQuery: PaginationQueryDto<any>,
        fieldConfigs: Record<string, IPaginationFieldConfig>
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
                    (filter: { field: string; operator: string; value: string }, index: number) => {
                        const field = filter.field.toLowerCase();
                        let alias = `ptlb`; // default alias for the main table
                        if (fieldConfigs[field]) {
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
                    let alias = `ptlb`; // default alias for the main table

                    if (fieldConfigs[field]) {
                        const config = fieldConfigs[field];
                        alias = config.alias(); // Use index 0 since sorting doesn't require multiple aliases
                    }

                    return `${alias}.${sortItem.field} ${sortItem.direction}`;
                })
                .join(', ');
        }

        const selectedFields = selectFields.length > 0 ? `${', '}${selectFields.join(', ')}` : [];

        return { filterQuery, filterValues, joinTables, selectFields: selectedFields, sortByQuery };
    }
}
