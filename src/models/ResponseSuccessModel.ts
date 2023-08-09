export default class ResponseSuccessModel {
    constructor(
        public code: number, 
        public status: string, 
        public data?: any
    ) { }
}