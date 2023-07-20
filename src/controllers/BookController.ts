import { NextFunction, Request, Response } from "express";
import BookModel from "../models/BookModel";
import BookService from "../services/BookService";
import UserService from "../services/UserService";
import ResponseSuccessModel from "../models/ResponseSuccessModel";

class BookController {
    
    /**
     * Verifica na base de dados se o livro está disponível para alugar ou se já foi alugado
     * @param {String} uuid Código do livro que será verificado na base se está disponível ou já alugado
     * @returns Booleano se está disponível ou não
     */
    checkIfIsAvalible(req: Request, res: Response, next: NextFunction): void {
        try {
            const { uuid } = req.params;

            const bookService = new BookService();
    
            const book = bookService.find(uuid);
    
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
    rent(req: Request, res: Response, next: NextFunction): void {
        try {
            const { cpf, uuid } = req.body;

            const userService = new UserService();
            const bookService = new BookService();
    
            const user = userService.find(cpf);
            const book = bookService.find(uuid);
            
            book.rentBook(user);

            const response = new ResponseSuccessModel(200, 'OK');
            res.status(response.code).send(response); 
        } catch (error) {
            console.error('[ERROR] - BookController - rent - Falha ao alugar livro - ', error);
            next(error);            
        }
    }

    /**
     * Devolve o livro que foi alugado
     */
    return(req: Request, res: Response, next: NextFunction): void {
        try {
            const { uuid } = req.body;

            const bookService = new BookService();

            const book = bookService.find(uuid);

            book.returnBook();

            const response = new ResponseSuccessModel(200, 'OK');
            res.status(response.code).send(response); 
        } catch (error) {
            console.error('[ERROR] - BookController - return - Falha ao devolver livro - ', error);
            next(error);  
        }
    }
}


export default BookController;