import { Book, PrismaClient, User } from "@prisma/client";
import ResponseErrorModel, { ErrorTypesEnum } from "../models/ResponseErrorModel";


class BookService {   
    async find(uuid: string) {
        try {
            const prisma = new PrismaClient();

            const filteredBook = await prisma.book.findFirst({
                where: { uuid }
            });

            prisma.$disconnect();

            if (!filteredBook) {
                throw new ResponseErrorModel(ErrorTypesEnum.NOT_FOUND, 'Livro não encontrado.', 404);
            }

            return filteredBook;
        } catch (error) {
            console.error('[ERROR] - BookService - find - Falha ao consultar livro - ', error);
            throw error;
        }
    }

    async update(book: Book): Promise<Book> {
        try {
            const prisma = new PrismaClient();

            const response = await prisma.book.update({
                where: { uuid: book.uuid },
                data: book
            });

            prisma.$disconnect();

            return response;
        } catch (error) {
            console.error('[ERROR] - BookService - update - Falha ao atualizar livro - ', error);
            throw error;
        }
    }

    async returnBook(book: Book): Promise<void> {
        if (book.disponivel) {
            throw new ResponseErrorModel(ErrorTypesEnum.NOT_RENTED, 'Livro não alugado anteriormente.', 500);
        }

        const prisma = new PrismaClient();

        book.userUuid = '';
        book.disponivel = true;

        await prisma.book.update({
            where: { uuid: book.uuid },
            data: book
        });

        prisma.$disconnect();
    }
}

export default BookService;