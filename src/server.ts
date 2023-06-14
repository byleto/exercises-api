import express from 'express';
import { json } from 'body-parser';
import router from './routes/users';
import connection from './config/db.config';
import cors from "cors";

const PORT = process.env.NODE_DOCKER_PORT || 8080;

const app = express();

app.use(cors({ origin: '*' }));

app.use(json());
app.use('/api', router);

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