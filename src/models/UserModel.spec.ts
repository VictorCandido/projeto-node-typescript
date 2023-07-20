import UserModel from "./UserModel";

describe('UserModel', () => {
    it('should be able to instance new UserModel', () => {
        const user = new UserModel('Nome do usuário', 'CPF do usuário');

        expect(user).toBeTruthy();
    });
});