import { NextFunction, Request, Response } from "express";
import BookService from "../services/BookService";
import UserService from "../services/UserService";
import ResponseSuccessModel from "../models/ResponseSuccessModel";
import FluigService from "../services/FluigService";
import ResponseErrorModel, { ErrorTypesEnum } from "../models/ResponseErrorModel";

class BookController {
    
    /**
     * Verifica na base de dados se o livro está disponível para alugar ou se já foi alugado
     * @param {String} uuid Código do livro que será verificado na base se está disponível ou já alugado
     * @returns Booleano se está disponível ou não
     */
    async checkIfIsAvalible(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { uuid } = req.params;

            // Instancia serviços
            const bookService = new BookService();
    
            // Consulta livro
            const book = await bookService.find(uuid);
    
            // Retorna resposta ao frontend
            const response = new ResponseSuccessModel(200, 'OK', book.disponivel);
            res.status(response.code).json(response);
        } catch (error) {
            console.error('[ERROR] - BookController - checkIfIsAvalible - Falha ao verificar se livro está disponível - ', error);
            next(error);
        }
    }
    
    /**
     * Faz a reserva do livro no CPF da pessoa que deseja alugar
     */
    async rent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cpf, uuid } = req.body;

            // Instancia serviços
            const userService = new UserService();
            const bookService = new BookService();
            const fluigService = new FluigService();
    
            // Consulta usuário e livro
            const user = await userService.find(cpf);
            const book = await bookService.find(uuid);

            // Verifica se o livro está disponível para alugar
            if (!book.disponivel) {
                throw new ResponseErrorModel(ErrorTypesEnum.NOT_AVALIBLE, 'Livro não disponível para aluguel.', 500);
            }
        
            // Vincula o usuário ao livro e muda disponibilidade
            book.userUuid = user.uuid;
            book.disponivel = false;
    
            // Atualiza o livro no banco
            await bookService.update(book);

            // Inicia solicitação do Fluig
            const processInstanceId = await fluigService.startProcess();

            // Retorna resposta ao frontend
            const response = new ResponseSuccessModel(200, 'OK', processInstanceId);
            res.status(response.code).send(response); 
        } catch (error) {
            console.error('[ERROR] - BookController - rent - Falha ao alugar livro - ', error);
            next(error);            
        }
    }

    /**
     * Devolve o livro que foi alugado
     */
    async return(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { uuid } = req.body;

            // Instancia serviços
            const bookService = new BookService();

            // Consulta livro
            const book = await bookService.find(uuid);

            // Verifica se o livro já foi alugado
            if (book.disponivel) {
                throw new ResponseErrorModel(ErrorTypesEnum.NOT_RENTED, 'Livro não alugado anteriormente.', 500);
            }
    
            // Desvincula o usuário ao livro e muda disponibilidade
            book.userUuid = '';
            book.disponivel = true;
    
            // Atualiza o livro no banco
            await bookService.update(book);

            // Retorna resposta ao frontend
            const response = new ResponseSuccessModel(200, 'OK');
            res.status(response.code).send(response); 
        } catch (error) {
            console.error('[ERROR] - BookController - return - Falha ao devolver livro - ', error);
            next(error);  
        }
    }
}


export default BookController;