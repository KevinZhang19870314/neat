import * as http from 'http';

export interface Context {
    req: http.IncomingMessage;
    res: http.ServerResponse;
    mode: 'development' | 'production';
    baseUrl: string,
    /** Store your token here or through some auth api call to retrieve */
    token: string;
}