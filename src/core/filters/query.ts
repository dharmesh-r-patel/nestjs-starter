// import * as _ from 'lodash';

/**
 * A utility class for generating SQL queries related to error logging.
 *
 * @export
 * @class Query
 */

export class Query {
    /**
     * Generates an SQL query for logging query errors.
     *
     * @param {any} module The module where the error occurred.
     * @param {any} method The method that caused the error.
     * @param {any} url The URL where the error occurred.
     * @param {string} reqdata The request data associated with the error.
     * @param {string} resdata The response data associated with the error.
     * @returns {{ name: string, type: string, syntax: () => string }} An object containing the SQL query details.
     *
     * @memberof Query
     */

    addQueryError(module: any, method: any, url: any, reqdata: string, resdata: string) {
        return {
            name: `addQueryError`,
            type: `INSERT`,
            syntax: () => {
                // data: any[]
                try {
                    let reqescValue = reqdata;
                    let resescValue = resdata;
                    reqescValue = reqescValue.replace(/'/g, "\\'");
                    resescValue = resescValue.replace(/'/g, "\\'");
                    const sql = `INSERT INTO Error (Module,Method,Url,Req,Response) VALUES
                ('${module}','${method}','${url}','${reqescValue}','${resescValue}');`;
                    return sql;
                } catch (error) {
                    return `Select ${module} ,${method},${url},${reqdata},${resdata}`;
                }
            },
        };
    }
}
