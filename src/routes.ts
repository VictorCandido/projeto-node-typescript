import express from 'express';
import BookController from './controllers/BookController';
import AuthService from './auth/AuthService';

const routes = express.Router();

const bookController = new BookController();
const authService = new AuthService();

// Autenticação
routes.post('/auth/login', authService.authorizate);

// Biblioteca
routes.get('/biblioteca/verificardisponibilidade/:uuid', bookController.checkIfIsAvalible);
routes.post('/biblioteca/alugarlivro', bookController.rent);
routes.post('/biblioteca/devolverlivro', bookController.return);

export default routes;