// import * as _ from 'lodash';

/**
 * Class representing SQL query builder for error logging.
 *
 * @description Provides a method to construct an SQL query for inserting HTTP error details
 * into an `Error` table. The query escapes single quotes in request and response data
 * to prevent SQL injection.
 *
 * @example
 * ```typescript
 * const query = new Query();
 * const sqlQuery = query.addHttpQueryError(
 *   'UserModule',
 *   'GET',
 *   '/users',
 *   JSON.stringify(requestData),
 *   JSON.stringify(responseData)
 * ).syntax();
 * console.log(sqlQuery); // Outputs the SQL query string
 * ```
 */

export class Query {
    /**
     * Constructs an SQL query to insert HTTP error details into the `Error` table.
     *
     * @param {string} module - The name of the module where the error occurred.
     * @param {string} method - The HTTP method used in the request.
     * @param {string} url - The URL of the request that caused the error.
     * @param {string} reqdata - The request data, serialized as a JSON string.
     * @param {string} resdata - The response data, serialized as a JSON string.
     * @returns {Object} An object representing the SQL query with a `name`, `type`, and `syntax` function.
     */

    addHttpQueryError(module: any, method: any, url: any, reqdata: string, resdata: string): any {
        return {
            name: `addQueryError`,
            type: `INSERT`,
            /**
             * Generates the SQL query string for inserting the error details.
             *
             * @returns {string} The SQL query string.
             */

            syntax: (): string => {
                //data: any[]
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
