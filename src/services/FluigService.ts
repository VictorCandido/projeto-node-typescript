import 'dotenv/config'
import { AxiosError } from 'axios';
import ResponseErrorModel, { ErrorTypesEnum } from '../models/ResponseErrorModel';
import AxiosService from './AxiosService';

export default class FluigService {
    async startProcess(): Promise<number> {
        try {
            const url = `${process.env.SERVER_URL}/process-management/api/v2/processes/${process.env.PROCESS_ID}/start`;
            const data = JSON.stringify({ "targetAssignee": "victor.candido" });
            
            // return 1;

            const axiosService = new AxiosService();

            const response = await axiosService.sendFluigRequest(url, data);

            if (response.status === 200) {
                const { processInstanceId } = response.data;

                return processInstanceId;
            } else {
                throw new ResponseErrorModel(ErrorTypesEnum.NOT_AVALIBLE, 'Falha ao iniciar solicitação no Fluig', response.status, response.data);
            }
        } catch (error: AxiosError | any) {
            console.error('[ERROR] - FluigService - startProcess - Falha ao iniciar solicitação - ', error);
            throw error;
        }
    }
}