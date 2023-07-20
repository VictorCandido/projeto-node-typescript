import crypto from 'crypto';
import UserModel from './UserModel';
import ResponseErrorModel, { ErrorTypesEnum } from './ResponseErrorModel';

class BookModel {
    private _uuid: string;
    private _nome: string;
    private _disponivel: boolean;
    private _user?: UserModel
    
    constructor(nome: string, disponivel?: boolean, uuid?: string) {
        this._uuid = uuid ?? crypto.randomUUID();
        this._nome = nome;
        this._disponivel = disponivel ?? true;
    }

    get uuid(): string {
        return this._uuid;
    }

    get disponivel(): boolean {
        return this._disponivel;
    }

    rentBook(user: UserModel): void {
        if (!this._disponivel) {
            throw new ResponseErrorModel(ErrorTypesEnum.NOT_AVALIBLE, 'Livro não disponível para aluguel.', 500);
        }

        this._user = user;
        this._disponivel = !this._disponivel;
    }

    returnBook(): void {
        if (this._disponivel) {
            throw new ResponseErrorModel(ErrorTypesEnum.NOT_RENTED, 'Livro não alugado anteriormente.', 500);
        }

        this._user = undefined;
        this._disponivel = !this._disponivel;
    }
}



export default BookModel;