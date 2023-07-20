export default class ResponseSuccessModel {
    private _code: number;
    private _status: string;
    private _data?: any;

    constructor(code: number, status: string, data?: any) {
        this._code = code;
        this._status = status;
        this._data = data;
    }

    get code(): number {
        return this._code;
    }
}