import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AuthService from './auth/AuthService';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(cors());

const authService = new AuthService();

app.use('/api/biblioteca', authService.checkAuthorization);

app.use('/api', routes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log('>> final error', error);

    if (error.errorCode) {
        res.status(error.errorCode).json({
            type: 'error',
            response: error
        });
    } else {
        res.status(500).json({
            type: 'error',
            response: error.message
        });
    }


});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;