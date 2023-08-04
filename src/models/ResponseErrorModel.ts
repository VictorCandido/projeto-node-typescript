export enum ErrorTypesEnum {
    NOT_FOUND = 'NOT_FOUND',
    NOT_AVALIBLE = 'NOT_AVALIBLE',
    NOT_RENTED = 'NOT_RENTED',
    UNAUTHORIZED = 'UNAUTHORIZED'
}

export default class ResponseErrorModel {
    private _errorType: ErrorTypesEnum;
    private _errorMessage: string;
    private _errorCode: number;
    private _errorData?: any;

    constructor(errorType: ErrorTypesEnum, errorMessage: string, errorCode: number, errorData?: any) {
        this._errorType = errorType;
        this._errorMessage = errorMessage;
        this._errorCode = errorCode;
        this._errorData = errorData;
    }

    // get errorType(): ErrorTypesEnum {
    //     return this._errorType
    // }

    // get errorMessage(): string {
    //     return this._errorMessage
    // }

    get errorCode(): number {
        return this._errorCode
    }

    // get errorData(): any {
    //     return this._errorData
    // }
    
}