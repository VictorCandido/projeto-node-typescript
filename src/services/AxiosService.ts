import OAuth, { RequestOptions } from 'oauth-1.0a';
import crypto from 'crypto';
import axios, { AxiosInstance } from 'axios';

export default class AxiosService {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.SERVER_URL
        });
    }

    private getAuthHeaderForRequest(request: RequestOptions) {
        const CONSUMER_KEY: string = String(process.env.CONSUMER_KEY);
        const CONSUMER_SECRET: string = String(process.env.CONSUMER_SECRET);
        const ACCESS_TOKEN: string = String(process.env.ACCESS_TOKEN);
        const TOKEN_SECRET: string = String(process.env.TOKEN_SECRET);

        const oauth = new OAuth({
            consumer: { 
                key: CONSUMER_KEY, 
                secret: CONSUMER_SECRET 
            },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string: string, key: string) {
                return crypto
                    .createHmac('sha1', key)
                    .update(base_string)
                    .digest('base64')
            }
        })

        const authorization = oauth.authorize(request, {
            key: ACCESS_TOKEN,
            secret: TOKEN_SECRET,
        });

        return oauth.toHeader(authorization);
    }

    sendRequest() {
        this.instance({
            url
        })
    }
}