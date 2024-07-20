import * as _ from 'lodash';

export class Query {
    findById() {
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

    findByCode(id?: string) {
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

    insert() {
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

    update() {
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

    delete() {
        return {
            name: `delete`,
            type: `UPDATE`,
            syntax: (id: string) => {
                const sql = `UPDATE currencies SET status = 127 WHERE status = 1 AND id_currency = '${id}' RETURNING id_currency as deletedid, code;`;

                return sql;
            },
        };
    }

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

    pgBaseQuery() {
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
