import ResponseErrorModel, { ErrorTypesEnum } from "../models/ResponseErrorModel";
import UserModel from "../models/UserModel";

class UserService {
    private users: Array<UserModel> = [
        new UserModel('Pessoa 1', '609.037.520-93'),
        new UserModel('Pessoa 2', '334.392.050-96'),
        new UserModel('Pessoa 3', '075.463.320-95')
    ]
    
    find(cpf: string) {
        try {
            const filteredUser = this.users.find((user: UserModel) => user.cpf == cpf);

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