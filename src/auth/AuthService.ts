import { NextFunction, Request, Response } from "express";
import { SignOptions, sign, verify } from "jsonwebtoken";
import ResponseErrorModel, { ErrorTypesEnum } from "../models/ResponseErrorModel";

export default class AuthService {
    authorizate(req: Request, res: Response, next: NextFunction) {
        const loginData = {
            username: 'usuario',
            password: 'senha123'
        }


        try {
            const authorization = req.headers.authorization || '';
    
            if (!authorization) {
                throw new ResponseErrorModel(ErrorTypesEnum.UNAUTHORIZED, 'Informe usuário e senha', 401);
            }
    
            const [ , b64auth ] = authorization.split(' ');
            const [ username, password ] = Buffer.from(b64auth, 'base64').toString().split(':');
    
            if (username !== loginData.username || password !== loginData.password) {
                throw new ResponseErrorModel(ErrorTypesEnum.UNAUTHORIZED, 'Usuário ou senha incorretos', 401);
            }
    
            const payload = {
                username,
                password
            };
    
            const secret = String(process.env.JWT_SECRET);
            
            const options: SignOptions = {
                expiresIn: '30s',
                subject: username + password
            };
            
            const token = sign(payload, secret, options);
            
            res.status(200).json({ token }).send();
        } catch (error) {
            console.error('[ERROR] - AuthService - authorizate - Falha ao gerar token - ', error);
            next(error);
        }
    }

    checkAuthorization(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.headers.authorization || '';
            const secret = String(process.env.JWT_SECRET);
    
            if (!authorization) {
                throw new ResponseErrorModel(ErrorTypesEnum.UNAUTHORIZED, 'Informe o token', 401);
            }

            const [ , token ] = authorization.split(' ');
    
            if (!token) {
                throw new ResponseErrorModel(ErrorTypesEnum.UNAUTHORIZED, 'token inválido', 401);
            }

            verify(token, secret);
            next();            
        } catch (error) {
            console.error('[ERROR] - AuthService - checkAuthorization - Falha ao gerar token - ', error);
            next(error);
        }
    }
}