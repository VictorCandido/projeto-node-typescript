import OAuth, { RequestOptions } from 'oauth-1.0a';
import crypto from 'crypto';
import axios, { AxiosError } from 'axios';

export default class AxiosService {
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

    async sendFluigRequest(url: string, data: any) {
        try {
            const request: RequestOptions = {
                url,
                method: 'POST'
            };
            
            const authHeader = this.getAuthHeaderForRequest(request);
    
            const headers = {
                ...authHeader,
                'Content-Type': 'application/json',
            }

            const response = await axios({
                url,
                method: 'POST',
                data,
                headers
            });
            
            return response;
        } catch (error: AxiosError | any) {
            console.error('[ERROR] - AxiosService - sendFluigRequest - Falha ao iniciar solicitação - ', error.data);
            throw error;
        }
    }
}