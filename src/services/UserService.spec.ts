import UserService from "./UserService";


describe('UserService', () => {
    it('should be able to find a user', () => {
        const userService = new UserService();

        const cpf = '075.463.320-95';

        const user = userService.find(cpf);

        expect(user).toBeDefined();
    });

    it('should not be able to find a user', () => {
        const userService = new UserService();
        // const cpf = '075.463.320-95';
        const cpf = '4c2923a9-ab32-40bf-86ad-ce095a33e135';

        expect(() => userService.find(cpf)).toThrowError();
    });
})