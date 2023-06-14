import express from 'express';
import { json } from 'body-parser';
import userRoute from './routes/users.route';
import exerciseRoute from './routes/exercises.route';
import connection from './config/db.config';
import cors from "cors";
import morgan  from "morgan";

const PORT = process.env.NODE_DOCKER_PORT || 8080;

const app = express();
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(json());

app.use('/api', userRoute);
 app.use('/api', exerciseRoute); //TODO:validate data when creating

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ message: err.message });
});

connection
  .sync()
  .then(() => {
    console.log('Database successfully connected');
  })
  .catch((err) => {
    console.log('Error', err);
  });

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

export default app;