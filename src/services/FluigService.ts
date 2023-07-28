import 'dotenv/config'
import axios from 'axios';
import oauth1a from 'oauth-1.0a';

export default class FluigService {
    private getAuthHeaderForRequest(request) {
        const oauth = oauth1a({
            consumer: { key: CONSUMERKEY, secret: CONSUMERSECRET },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto
                    .createHmac('sha1', key)
                    .update(base_string)
                    .digest('base64')
            },
        })

        const authorization = oauth.authorize(request, {
            key: TOKENKEY,
            secret: TOKENSECRET,
        });

        return oauth.toHeader(authorization);
    }

    async startProcess() {
        try {
            const CONSUMER_KEY = process.env.CONSUMER_KEY;
            const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
            const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
            const TOKEN_SECRET = process.env.TOKEN_SECRET;

            let url = `${process.env.SERVER_URL}/process-management/api/v2/processes/${process.env.PROCESS_ID}/start`;
            url += `oauth_consumer_key=${CONSUMER_KEY}`;
            url += `&oauth_token=${ACCESS_TOKEN}`;
            url += `&oauth_signature_method=HMAC-SHA1`;
            url += `&oauth_timestamp=1690486290`;
            url += `&oauth_nonce=OSuoa394eMT`;
            url += `&oauth_version=1.0`;
            url += `&oauth_signature=5hR2jJ7OYEQzQarNQVkxXGu%2FgeQ%3D`;

            

            const response = await axios.request({
                url: url,
                method: '',
                data: {
    
                }
            });
        } catch (error) {
            
        }


        
        
        let data = JSON.stringify({
            "targetAssignee": "admin",
            "comment": "teste"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://192.168.0.17:8080/process-management/api/v2/processes/AlugueldeLivros/start?oauth_consumer_key=oAuth_POST&oauth_token=59350b41-4e3a-453d-a758-a7c3b25e9f44&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1690486290&oauth_nonce=OSuoa394eMT&oauth_version=1.0&oauth_signature=5hR2jJ7OYEQzQarNQVkxXGu%2FgeQ%3D',
            headers: { 
                'Content-Type': 'application/json', 
                'Cookie': 'JSESSIONID="qByX_pjsDtL4xWlBU7cuz7Jls4ustCV5i4g7WZ-Q.master:fluig1"; JSESSIONID="he1SmY984Sqf_ZQMSTYD9hbgFiqqwTd_L1Qrgl4p.master:fluig1"'
            },
            data : data
        };

        axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
        console.log(error);
        });



        return process.env.SERVER_URL;  
    }
}