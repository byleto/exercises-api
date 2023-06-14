import express, { Application, Request, Response, NextFunction } from 'express';
import { router as userRoutes } from './routes/user.routes';
import cors from 'cors';
import morgan from 'morgan';

const app: Application = express();
app.use(morgan('dev'));

app.use(cors({ origin: '*' }));

app.use('/', userRoutes);

export default app;
