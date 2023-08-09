import BookService from "./BookService";


describe('BookService', () => {
    it('should be able to find a book', async () => { 
        const bookService = new BookService();

        const uuid = '34936b00-784a-466f-97bf-d6f1ecdb5092';

        const book = await bookService.find(uuid);

        expect(book).toBeDefined();
    });

    it('should not be able to find a book', () => {
        const bookService = new BookService();

        const uuid = 'sem id';
        // const uuid = '4c2923a9-ab32-40bf-86ad-ce095a33e135';

        expect(async () => await bookService.find(uuid)).rejects;
    });
})