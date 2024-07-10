// import * as _ from 'lodash';

export class Query {
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
