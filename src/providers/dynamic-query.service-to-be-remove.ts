import * as _ from 'lodash';

/**
 * Options for building queries.
 *
 * @export
 * @interface QueryOptions
 */

export interface QueryOptions {
    /**
     * Name of the query.
     *
     * @type {string}
     * @memberof QueryOptions
     */

    queryName?: string;

    /**
     * Type of the query (e.g., INSERT, SELECT, UPDATE, DELETE).
     *
     * @type {string}
     * @memberof QueryOptions
     */

    queryType?: string;

    /**
     * Name of the table to perform the query on.
     *
     * @type {string}
     * @memberof QueryOptions
     */

    table: string;

    /**
     * List of fields to include in the query (e.g., columns for SELECT, INSERT, or UPDATE).
     *
     * @type {string[]}
     * @memberof QueryOptions
     */

    fields?: string[];

    /**
     * Values to be used in the query (e.g., for INSERT or UPDATE operations).
     *
     * @type {Record<string, any>}
     * @memberof QueryOptions
     */

    values?: Record<string, any>;

    /**
     * Conditions for the query (e.g., WHERE clauses).
     *
     * @type {Record<string, any>}
     * @memberof QueryOptions
     */

    conditions?: Record<string, any>;

    /**
     * Optional conditions for the query.
     *
     * @type {Record<string, any>}
     * @memberof QueryOptions
     */

    optionalConditions?: Record<string, any>;

    /**
     * Join clauses to include in the query.
     *
     * @type {string[]}
     * @memberof QueryOptions
     */

    joins?: string[];

    /**
     * Fields to return from the query.
     *
     * @type {string[]}
     * @memberof QueryOptions
     */

    returningFields?: string[];

    /**
     * Type of delete operation ('soft' or 'hard').
     *
     * @type {string}
     * @memberof QueryOptions
     */
    deleteType?: string;
}

/**
 * Class to build dynamic SQL queries.
 *
 * @export
 * @class DynamicQueryBuilder
 */
export class DynamicQueryBuilder {
    /**
     * Builds an INSERT SQL query.
     *
     * @param {QueryOptions} options - Options for the INSERT query.
     * @returns {object} - An object containing the query name, type, and the SQL syntax.
     * @memberof DynamicQueryBuilder
     */

    buildInsertQuery(options: QueryOptions): object {
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

    /**
     * Builds a SELECT SQL query.
     *
     * @param {QueryOptions} options - Options for the SELECT query.
     * @returns {object} - An object containing the query name, type, and the SQL syntax.
     * @memberof DynamicQueryBuilder
     */

    buildSelectQuery(options: QueryOptions): object {
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

    /**
     * Builds an UPDATE SQL query.
     *
     * @param {QueryOptions} options - Options for the UPDATE query.
     * @returns {object} - An object containing the query name, type, SQL syntax, and values to be used.
     * @memberof DynamicQueryBuilder
     */

    buildUpdateQuery(options: QueryOptions): object {
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

    /**
     * Builds a DELETE SQL query.
     *
     * @param {QueryOptions} options - Options for the DELETE query.
     * @returns {object} - An object containing the query name, type, and the SQL syntax.
     * @memberof DynamicQueryBuilder
     */

    buildDeleteQuery(options: QueryOptions): object {
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
