import request from 'supertest';
import app from '..';

describe('AuthService', () => {
    it('should be able to generate a token', async () => {
        const response = await request(app)
            .post(`/api/auth/login`)
            .auth('usuario', 'senha123')
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body.token).toBeTruthy();
    });
});