// import BookController from "./BookController";
import request from 'supertest';

import app from "..";
import BookService from '../services/BookService';
import UserService from '../services/UserService';

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
        const uuid = '34936b00-784a-466f-97bf-d6f1ecdb5092';

        const response = await request(app)
            .get(`/api/biblioteca/verificardisponibilidade/${uuid}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('code');
        expect(response.body.data).toBeTruthy();
    }); 

    it('should not to be avalible', async () => {
        const uuid = '7b5d6b88-4f8a-45f6-a1b4-e22b26d5741c';

        const response = await request(app)
            .get(`/api/biblioteca/verificardisponibilidade/${uuid}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('code');
        expect(response.body.data).not.toBeTruthy();
    });

    it('should not be able to find the book', async () => {
        const uuid = 'sem id';

        const response = await request(app)
        .get(`/api/biblioteca/verificardisponibilidade/${uuid}`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('type');
        expect(response.body.response).toHaveProperty('errorCode');
        expect(response.body.response.errorCode).toBe(404);
        expect(response.body.response.errorMessage).toBe('Livro não encontrado.');
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
            uuid: 'a875b452-6240-4ffa-9486-a61280f9e88d'
        }
        const response = await request(app)
            .post('/api/biblioteca/alugarlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('OK');
        expect(response.body.data).toBeTruthy();

        const bookService = new BookService();
        const userService = new UserService();

        const book = await bookService.find(requestData.uuid);
        const user = await userService.find(requestData.cpf);

        expect(book.disponivel).toBeFalsy();
        expect(book.userUuid).toBe(user.uuid);
    });

    it('should not be able to rent a book', async () => {
        const requestData = {
            cpf: '609.037.520-93',
            uuid: '7b5d6b88-4f8a-45f6-a1b4-e22b26d5741c'
        }
        const response = await request(app)
            .post('/api/biblioteca/alugarlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('type');
        expect(response.body.response).toHaveProperty('errorCode');
        expect(response.body.response.errorCode).toBe(500);
        expect(response.body.response.errorMessage).toBe('Livro não disponível para aluguel.');
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
        expect(response.body.response).toHaveProperty('errorCode');
        expect(response.body.response.errorCode).toBe(404);
        expect(response.body.response.errorMessage).toBe('Livro não encontrado.');
    });

    it('should not find a user', async () => {
        const requestData = {
            cpf: 'sem cpf',
            uuid: '34936b00-784a-466f-97bf-d6f1ecdb5092'
        }
        const response = await request(app)
            .post('/api/biblioteca/alugarlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('type');
        expect(response.body.response).toHaveProperty('errorCode');
        expect(response.body.response.errorCode).toBe(404);
        expect(response.body.response.errorMessage).toBe('Usuário não encontrado.');
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
            uuid: 'a875b452-6240-4ffa-9486-a61280f9e88d'
        }

        const response = await request(app)
            .post('/api/biblioteca/devolverlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('OK');

        const bookService = new BookService();
        const book = await bookService.find(requestData.uuid);

        expect(book.disponivel).toBeTruthy();
        expect(book.userUuid).toBeFalsy();
    });

    it('should not be able to return a book', async () => {
        const requestData = {
            uuid: '34936b00-784a-466f-97bf-d6f1ecdb5092'
        }
        const response = await request(app)
            .post('/api/biblioteca/devolverlivro')
            .set('Authorization', `Bearer ${token}`)
            .send(requestData);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('type');
        expect(response.body.response).toHaveProperty('errorCode');
        expect(response.body.response.errorCode).toBe(500);
        expect(response.body.response.errorMessage).toBe('Livro não alugado anteriormente.');
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
        expect(response.body.response).toHaveProperty('errorCode');
        expect(response.body.response.errorCode).toBe(404);
        expect(response.body.response.errorMessage).toBe('Livro não encontrado.');
    });
});