import * as request from 'request';
let config = require('../../../config/user-config.json');
 
export interface HttpError {
    url: string,
    statusCode: number,
    message: string 
}

export class HttpHelper {
    static async post(url: string, headers?: any, from?: any) {
        return (new Promise((
                resolve: (response: any) => any, 
                reject: (error: HttpError) => void
            ) => {
                request.post({
                    url: url,
                    json: true,
                    headers: headers || {},
                    form: from || {}
                }, function (error: any, response: any, body: any) {
                    if (!error && response.statusCode === 201) {
                        resolve(body);
                    } else if(response) {
                        reject({
                            url: url,
                            statusCode: response.statusCode,
                            message: error
                        });
                    } else {
                        reject({
                            url: url,
                            statusCode: undefined, 
                            message: error
                        });
                    }
                });
            }).catch((error: HttpError) => {
                throw error;
            })
        );
    }

    static async get(url: string,headers?: any, from?: any) {
        return (new Promise((
                resolve: (response: any) => any, 
                reject: (error: HttpError) => void
            ) => {
                request.get({
                    url: url,
                    json: true,
                    headers: headers || {},
                    form: from || {}
                }, function (error: any, response: any, body: any) {
                    if (!error && response.statusCode === 200) {
                        resolve(body);
                    } else if(response) {
                        reject({
                            url: url,
                            statusCode: response.statusCode, 
                            message: error
                        });
                    } else {
                        reject({
                            url: url,
                            statusCode: undefined, 
                            message: error
                        });
                    }
                }).auth(config.username, config.password, false);;
            }).catch((error: HttpError) => {
                throw error;
            })
        );
    }
}