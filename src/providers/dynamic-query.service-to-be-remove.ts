import * as _ from 'lodash';

export interface QueryOptions {
    queryName?: string;
    queryType?: string;
    table: string;
    fields?: string[];
    values?: Record<string, any>;
    conditions?: Record<string, any>;
    optionalConditions?: Record<string, any>;
    joins?: string[];
    returningFields?: string[];
    deleteType?: string;
}

export class DynamicQueryBuilder {
    buildInsertQuery(options: QueryOptions) {
        const { queryName, queryType, fields, table, values = {}, returningFields = [] } = options;
        const conds = _.pick(values, fields);
        const keys = _.keys(conds);
        const vals = _.values(conds);

        const returningClause = returningFields.length
            ? `RETURNING ${returningFields.join(', ')}`
            : '';

        const sql = `INSERT INTO ${table} (${keys.join()}) VALUES ('${vals.join("','")}') ${returningClause};`;

        return {
            name: queryName ? queryName : 'add',
            type: queryType ? queryType : 'INSERT',
            syntax: () => {
                return sql;
            },
        };
    }

    buildSelectQuery(options: QueryOptions) {
        const {
            queryName,
            queryType,
            table,
            fields = ['*'],
            conditions = {},
            joins = [],
            optionalConditions = null,
        } = options;

        const whereClauses = Object.keys(conditions).map((key) => {
            const value = conditions[key];
            return typeof value === 'string' ? `${key} = '${value}'` : `${key} = ${value}`;
        });

        if (optionalConditions) {
            // Adding optional conditions dynamically
            Object.keys(optionalConditions).forEach((key) => {
                const value = optionalConditions[key];
                if (value) {
                    whereClauses.push(
                        typeof value === 'string' ? `${key} != '${value}'` : `${key} != ${value}`
                    );
                }
            });
        }

        const whereClause = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
        const joinClause = joins.length ? joins.join(' ') : '';

        const sql = `SELECT ${fields.join(', ')} FROM ${table} ${joinClause} ${whereClause}`;

        return {
            name: queryName ? queryName : 'find',
            type: queryType ? queryType : 'SELECT_ONE',
            syntax: () => {
                return sql;
            },
        };
    }

    buildUpdateQuery(options: QueryOptions) {
        const { table, values = {}, conditions = {}, returningFields = [] } = options;

        const setClauses = Object.keys(values).map((key, index) => `${key} = $${index + 1}`);
        const whereClauses = Object.keys(conditions).map(
            (key, index) => `${key} = $${index + Object.keys(values).length + 1}`
        );

        const returningClause = returningFields.length
            ? `RETURNING ${returningFields.join(', ')}`
            : '';

        const sql = `UPDATE ${table} SET ${setClauses.join(', ')} WHERE ${whereClauses.join(' AND ')} ${returningClause};`;

        return {
            name: 'update',
            type: 'UPDATE',
            sql,
            values: [...Object.values(values), ...Object.values(conditions)],
        };
    }

    //     return {
    //   name: `delete`,
    //   type: `UPDATE`,
    //   syntax: (idArea: number) => {
    //     const sql = `UPDATE Area SET Status = 127 WHERE Status = 1 AND idArea = ${idArea}`;

    //     return sql;
    //   },
    // };

    buildDeleteQuery(options: QueryOptions) {
        const {
            queryName,
            queryType,
            table,
            conditions = {},
            optionalConditions = null,
            joins = [],
            returningFields = [],
            deleteType = 'soft',
        } = options;

        const whereClauses = Object.keys(conditions).map((key) => {
            const value = conditions[key];
            return typeof value === 'string' ? `${key} = '${value}'` : `${key} = ${value}`;
        });

        if (optionalConditions) {
            // Adding optional conditions dynamically
            Object.keys(optionalConditions).forEach((key) => {
                const value = optionalConditions[key];
                if (value) {
                    whereClauses.push(
                        typeof value === 'string' ? `${key} != '${value}'` : `${key} != ${value}`
                    );
                }
            });
        }

        const whereClause = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
        const joinClause = joins.length ? joins.join(' ') : '';

        // const whereClauses = Object.keys(conditions).map((key, index) => `${key} = $${index + 1}`);
        // const whereClause = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

        const returningClause = returningFields.length
            ? `RETURNING ${returningFields.join(', ')}`
            : '';

        let sql: string;
        if (deleteType === 'soft') {
            sql = `UPDATE ${table} SET status = 127 ${whereClause} ${returningClause};`;
        } else {
            sql = `DELETE FROM ${table} ${joinClause} ${whereClause} ${returningClause};`;
        }

        console.log('QQQQQQQQQQQQQQQQQQQQ', sql);

        return {
            name: queryName ? queryName : 'delete',
            type: queryType ? queryType : 'DELETE',
            syntax: () => {
                return sql;
            },
        };
    }
}
