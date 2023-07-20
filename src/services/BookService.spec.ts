import BookService from "./BookService";


describe('BookService', () => {
    it('should be able to find a book', () => { 
        const bookService = new BookService();

        const uuid = '4c2923a9-ab32-40bf-86ad-ce095a33e135';

        const book = bookService.find(uuid);

        expect(book).toBeDefined();
    });

    it('should not be able to find a book', () => {
        const bookService = new BookService();

        const uuid = 'sem id';
        // const uuid = '4c2923a9-ab32-40bf-86ad-ce095a33e135';

        expect(() => bookService.find(uuid)).toThrowError();
    });
})