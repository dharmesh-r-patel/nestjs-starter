import * as _ from 'lodash';

/**
 * @fileoverview
 * This file defines the `Query` class, which provides methods for generating SQL queries
 * related to currency data management.
 *
 * @module
 * @description
 * The `Query` class includes methods to generate SQL queries for operations such as
 * retrieving, inserting, updating, and deleting currency records from the database.
 * It uses the lodash library for object manipulation and query construction.
 */

export class Query {
    /**
     * Generates a SQL query to find a currency by its ID.
     * @returns {object} The query configuration object with `name`, `type`, and `syntax` properties.
     */

    findById(): object {
        return {
            name: `findById`,
            type: `SELECT_ONE`,
            syntax: (where: any) => {
                const allowedKeys = [
                    'c.id_currency',
                    'c.code',
                    'c.name',
                    'c.name_plural',
                    'c.symbol',
                    'c.symbol_native',
                    'c.decimal_digits',
                    'c.rounding',
                ];
                const id = _.get(where, 'id');
                const sql = `select ${allowedKeys.join()} from currencies c WHERE c.status = 1 AND c.id_currency = '${id}';`;
                return sql;
            },
        };
    }

    /**
     * Generates a SQL query to find a currency by its code.
     * @param {string} [id] - Optional ID to exclude from the search if provided.
     * @returns {object} The query configuration object with `name`, `type`, and `syntax` properties.
     */

    findByCode(id?: string): object {
        return {
            name: `findByCode`,
            type: `SELECT_ONE`,
            syntax: (where: any) => {
                const allowedKeys = ['c.id_currency', 'c.code'];
                const code = _.get(where, 'code');

                let sql = `SELECT ${allowedKeys.join()} FROM currencies c WHERE c.status = 1 AND c.code = '${code}'`;
                if (id) {
                    sql += ` AND c.id_currency != '${id}';`;
                }
                return sql;
            },
        };
    }

    /**
     * Generates a SQL query to insert a new currency.
     * @returns {object} The query configuration object with `name`, `type`, and `syntax` properties.
     */

    insert(): object {
        return {
            name: `add`,
            type: `INSERT`,
            syntax: (where: any) => {
                const allowedKeys = [
                    'code',
                    'name',
                    'name_plural',
                    'symbol',
                    'symbol_native',
                    'decimal_digits',
                    'rounding',
                ];
                const conds = _.pick(where, allowedKeys);
                const keys = _.keys(conds);
                const values = _.values(conds);
                const sql = `insert into currencies (${keys.join()}) values ('${values.join("','")}') RETURNING id_currency as insertid, code;`;
                console.log('QUERY', sql);
                return sql;
            },
        };
    }

    /**
     * Generates a SQL query to update an existing currency.
     * @returns {object} The query configuration object with `name`, `type`, and `syntax` properties.
     */

    update(): object {
        return {
            name: `update`,
            type: `UPDATE`,
            syntax: (where: any) => {
                let sql = `UPDATE currencies SET `;
                const id = _.get(where, 'id');
                _.unset(where, 'id');
                const allowedKeys = [
                    'code',
                    'name',
                    'name_plural',
                    'symbol',
                    'symbol_native',
                    'decimal_digits',
                    'rounding',
                ];
                where = _.pick(where, allowedKeys);

                const lastKey = Object.keys(where)[Object.keys(where).length - 1];
                _.mapKeys(where, (value, key) => {
                    sql += `${key} = '${value}'`;
                    sql += lastKey == key ? `` : `, `;
                });
                sql += ` WHERE status = 1 AND id_currency = '${id}' RETURNING id_currency as updatedid, code;`;

                console.log('QQQQQQQQQQQQQQ', sql);

                return sql;
            },
        };
    }

    /**
     * Generates a SQL query to delete a currency by its ID.
     * @param {string} id - The ID of the currency to delete.
     * @returns {object} The query configuration object with `name`, `type`, and `syntax` properties.
     */

    delete(): object {
        return {
            name: `delete`,
            type: `UPDATE`,
            syntax: (id: string) => {
                const sql = `UPDATE currencies SET status = 127 WHERE status = 1 AND id_currency = '${id}' RETURNING id_currency as deletedid, code;`;

                return sql;
            },
        };
    }

    /**
     * Provides the base fields for selecting currencies in pagination queries.
     * @returns {string[]} An array of column names to be selected in pagination queries.
     */

    pgBaseSelectField(): string[] {
        return [
            'ptbl.id_currency',
            'ptbl.code',
            'ptbl.name',
            'ptbl.symbol',
            'ptbl.decimal_digits',
            'ptbl.rounding',
        ];
    }

    /**
     * Provides the base query for selecting currencies.
     * @returns {string} The base query string for selecting currencies.
     */

    pgBaseQuery(): string {
        return ` FROM currencies ptbl`;
    }
}

// import * as _ from 'lodash';

// import { DynamicQueryBuilder, QueryOptions } from '@providers/dynamic-query.service';

// export class Query {
//     private queryBuilder = new DynamicQueryBuilder();

//     findBy(key: string, value: string, id?: string) {
//         const selectOptions: QueryOptions = {
//             table: 'currencies',
//             fields: ['id_currency', 'code'],
//             conditions: { status: 1, ...(key && { [key]: value }) },
//             ...(id && {
//                 optionalConditions: {
//                     id_currency: id,
//                 },
//             }),
//         };

//         return this.queryBuilder.buildSelectQuery(selectOptions);
//     }

//     insert(values: any) {
//         const insertOptions: QueryOptions = {
//             table: 'currencies',
//             fields: [
//                 'code',
//                 'name',
//                 'name_plural',
//                 'symbol',
//                 'symbol_native',
//                 'decimal_digits',
//                 'rounding',
//             ],
//             values: values,
//             returningFields: ['id_currency as insertid', 'code'],
//         };

//         return this.queryBuilder.buildInsertQuery(insertOptions);
//     }

//     delete(key: string, value: string) {
//         const deleteOptions: QueryOptions = {
//             table: 'currencies',
//             conditions: { status: 1, ...(key && { [key]: value }) },
//             returningFields: ['id_currency as deleteid'],
//         };

//         return this.queryBuilder.buildDeleteQuery(deleteOptions);
//     }

//     pgBaseSelectField(): string[] {
//         return [
//             'ptbl.id_currency',
//             'ptbl.code',
//             'ptbl.name',
//             'ptbl.symbol',
//             'ptbl.decimal_digits',
//             'ptbl.rounding',
//         ];
//     }

//     pgBaseQuery() {
//         return ` FROM currencies ptbl`;
//     }
// }
