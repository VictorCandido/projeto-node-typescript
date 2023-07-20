import ResponseErrorModel, { ErrorTypesEnum } from "./ResponseErrorModel";

describe('ResponseErrorModel', () => {
    it('should be able to instance new ResponseErrorModel', () => {
        const error = new ResponseErrorModel(ErrorTypesEnum.NOT_FOUND, 'Mensagem de erro', 500, {});

        expect(error).toBeTruthy();
    });
});