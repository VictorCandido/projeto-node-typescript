import 'dotenv/config'
import axios from 'axios';
import OAuth, { RequestOptions } from 'oauth-1.0a';
import crypto from 'crypto';

export default class FluigService {
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

    async startProcess() {
        try {
            const request = {
                url: `${process.env.SERVER_URL}/process-management/api/v2/processes/${process.env.PROCESS_ID}/start`,
                method: 'POST',
                body: JSON.stringify({
                    "targetAssignee": "victor.candido"
                })
            };
            
            const authHeader = this.getAuthHeaderForRequest(request);

            const options = { 
                headers: {
                    ...authHeader,
                    'Content-Type': 'application/json',
                }
            }
            
            const response = await axios.post(
                request.url,
                request.body,
                options
            );
    
    
            console.log('#### RESPONSE', response);
        } catch (error) {
            console.error('[ERROR] - FluigService - startProcess - Falha ao iniciar solicitação - ', error);
            throw error;
        }

        return process.env.SERVER_URL;
    }
}