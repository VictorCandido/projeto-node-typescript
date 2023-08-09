export enum ErrorTypesEnum {
    NOT_FOUND = 'NOT_FOUND',
    NOT_AVALIBLE = 'NOT_AVALIBLE',
    NOT_RENTED = 'NOT_RENTED',
    UNAUTHORIZED = 'UNAUTHORIZED'
}

export default class ResponseErrorModel {
    constructor(
        public errorType: ErrorTypesEnum, 
        public errorMessage: string, 
        public errorCode: number, 
        public errorData?: any
    ) { }
}