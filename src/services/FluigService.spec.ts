import FluigService from "./FluigService";

describe('FluigService', () => {
    it('should be able to start a process', () => { 
        const fluigService = new FluigService();
        const result = fluigService.startProcess();

        expect(result).toBe('http://192.168.0.17:8080');
    });
})