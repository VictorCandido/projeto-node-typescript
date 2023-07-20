import BookModel from "../models/BookModel";
import ResponseErrorModel, { ErrorTypesEnum } from "../models/ResponseErrorModel";


class BookService {
    books: Array<BookModel> = [
        new BookModel('Nome 1', true, '908cd771-f8fe-41d0-ad43-79b27accbccf'),
        new BookModel('Nome 2', false, '4c2923a9-ab32-40bf-86ad-ce095a33e135'),
        new BookModel('Nome 3', true, 'ad99004f-b802-4f52-8217-bc983e263325')
    ]
    
    find(uuid: string) {
        try {
            console.log('#### uuid', uuid);

            const filteredBook = this.books.find((book: BookModel) => book.uuid == uuid);

            if (!filteredBook) {
                throw new ResponseErrorModel(ErrorTypesEnum.NOT_FOUND, 'Livro não encontrado.', 404);
            }

            return filteredBook;
        } catch (error) {
            console.error('[ERROR] - BookService - find - Falha ao consultar livro - ', error);
            throw error;
        }
    }
}

export default BookService;