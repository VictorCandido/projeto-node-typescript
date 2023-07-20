import BookModel from "./BookModel";

describe('BookModel', () => {
    it('should be able to instance new BookModel', () => {
        const book = new BookModel('Nome do Livro');

        expect(book).toBeTruthy();
        expect(book).toHaveProperty('_uuid');
        expect(book).toHaveProperty('_nome');
        expect(book).toHaveProperty('_disponivel');
    });
});