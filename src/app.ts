import express from 'express';
import apiRoute from './routes/api';
import 'dotenv/config';
import { errorHandler } from './middlewares';

const app = express();
const { PORT } = process.env;

app.use(express.json());

app.use('/api', apiRoute);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on: http://localhost:${PORT}`);
});
