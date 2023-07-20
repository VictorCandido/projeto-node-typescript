import ResponseSuccessModel from "./ResponseSuccessModel";

describe('ResponseSuccessModel', () => {
    it('should be able to instance new ResponseSuccessModel', () => {
        const success = new ResponseSuccessModel(200, 'OK', {});

        expect(success).toBeTruthy();
    });
});