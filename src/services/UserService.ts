import { PrismaClient } from "@prisma/client";
import ResponseErrorModel, { ErrorTypesEnum } from "../models/ResponseErrorModel";

class UserService {  
    async find(cpf: string) {
        try {
            const prisma = new PrismaClient();

            const filteredUser = await prisma.user.findFirst({
                where: { cpf }
            });

            prisma.$disconnect();

            if (!filteredUser) {
                throw new ResponseErrorModel(ErrorTypesEnum.NOT_FOUND, 'Usuário não encontrado.', 404);
            }

            return filteredUser;
        } catch (error) {
            console.error('[ERROR] - UserService - find - Falha ao consultar usuário - ', error);
            throw error;
        }
    }
}

export default UserService;