class UserModel {
    private _nome: string;
    private _cpf: string;

    constructor(nome: string, cpf: string) {
        this._nome = nome;
        this._cpf = cpf;
    }

    get cpf(): string {
        return this._cpf;
    }
}

export default UserModel;