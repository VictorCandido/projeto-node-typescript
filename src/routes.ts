import express from 'express';
import BookController from './controllers/BookController';

const routes = express.Router();

routes.get('/biblioteca/verificardisponibilidade/:uuid', new BookController().checkIfIsAvalible);
routes.post('/biblioteca/alugarlivro', new BookController().rent);
routes.post('/biblioteca/devolverlivro', new BookController().return);

export default routes;