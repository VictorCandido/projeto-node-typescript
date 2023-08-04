// import BookController from "./BookController";
import request from 'supertest';

import app from "..";

describe('Check if the book is avalible or not', () => {
    let token = '';
    
    beforeAll(async () => {
        const response = await request(app)
            .post(`/api/auth/login`)
            .auth('usuario', 'senha123')
            .send();

        token = response.body.token;
    });

    it('should be avalible', async () => {
        const uuid = '908cd771-f8fe-41d0-ad43-79b27accbccf';

        const response = await request(app)
            .get(`/api/biblioteca/verificardisponibilidade/${uuid}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_code');
        expect(response.body._data).toBeTruthy();
    }); 

    it('should not to be avalible', async () => {
        const uuid = '4c2923a9-ab32-40bf-86ad-ce095a33e135';

        const response = await request(app)
            .get(`/api/biblioteca/verificardisponibilidade/${uuid}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_code');
        expect(response.body._data).not.toBeTruthy();
    });

    it('should not be able to find the book', async () => {
        const uuid = 'sem id';

        const response = await request(app)
        .get(`/api/biblioteca/verificardisponibilidade/${uuid}`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('type');
        expect(response.body.response).toHaveProperty('_errorCode');
        expect(response.body.response._errorCode).toBe(404);
        expect(response.body.response._errorMessage).toBe('Livro não encontrado.');
    });
});

describe('Rent a book', () => {
    let token = '';
    
    beforeAll(async () => {
        const response = await request(app)
            .post(`/api/auth/login`)
            .auth('usuario', 'senha123')
            .send();

        token = response.body.token;
    });

    it('should be able to rent a book', async () => {
        const requestData = {
            cpf: '609.037.520-93',
            uuid: '908cd771-f8fe-41d0-ad43-79b27accbccf'
        }
        const response = await request(app)
            .post('/api/biblioteca/alugarlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(200);
        expect(response.body._status).toBe('OK');
        expect(response.body._data).toBeTruthy();
    });

    it('should not be able to rent a book', async () => {
        const requestData = {
            cpf: '609.037.520-93',
            uuid: '4c2923a9-ab32-40bf-86ad-ce095a33e135'
        }
        const response = await request(app)
            .post('/api/biblioteca/alugarlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('type');
        expect(response.body.response).toHaveProperty('_errorCode');
        expect(response.body.response._errorCode).toBe(500);
        expect(response.body.response._errorMessage).toBe('Livro não disponível para aluguel.');
    });

    it('should not find a book', async () => {
        const requestData = {
            cpf: '609.037.520-93',
            uuid: 'sem id'
        }
        const response = await request(app)
            .post('/api/biblioteca/alugarlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('type');
        expect(response.body.response).toHaveProperty('_errorCode');
        expect(response.body.response._errorCode).toBe(404);
        expect(response.body.response._errorMessage).toBe('Livro não encontrado.');
    });

    it('should not find a user', async () => {
        const requestData = {
            cpf: 'sem cpf',
            uuid: '908cd771-f8fe-41d0-ad43-79b27accbccf'
        }
        const response = await request(app)
            .post('/api/biblioteca/alugarlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('type');
        expect(response.body.response).toHaveProperty('_errorCode');
        expect(response.body.response._errorCode).toBe(404);
        expect(response.body.response._errorMessage).toBe('Usuário não encontrado.');
    });
});

describe('Return a book', () => {
    let token = '';
    
    beforeAll(async () => {
        const response = await request(app)
            .post(`/api/auth/login`)
            .auth('usuario', 'senha123')
            .send();

        token = response.body.token;
    });

    it('should be able to return a book', async () => {
        const requestData = {
            uuid: '4c2923a9-ab32-40bf-86ad-ce095a33e135'
        }
        const response = await request(app)
            .post('/api/biblioteca/devolverlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(200);
        expect(response.body._status).toBe('OK');
    });

    it('should not be able to return a book', async () => {
        const requestData = {
            uuid: '908cd771-f8fe-41d0-ad43-79b27accbccf'
        }
        const response = await request(app)
            .post('/api/biblioteca/devolverlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('type');
        expect(response.body.response).toHaveProperty('_errorCode');
        expect(response.body.response._errorCode).toBe(500);
        expect(response.body.response._errorMessage).toBe('Livro não alugado anteriormente.');
    });

    it('should not find a book', async () => {
        const requestData = {
            uuid: 'sem id'
        }
        const response = await request(app)
            .post('/api/biblioteca/devolverlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('type');
        expect(response.body.response).toHaveProperty('_errorCode');
        expect(response.body.response._errorCode).toBe(404);
        expect(response.body.response._errorMessage).toBe('Livro não encontrado.');
    });
});