import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

const HOST = '0.0.0.0';
const PORT = 3000;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log('>> final error', error);

    res.status(error.errorCode).json({
        type: 'error',
        response: error
    });
});

app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}`));

export default app;