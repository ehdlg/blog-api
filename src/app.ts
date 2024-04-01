import express from 'express';
import apiRoute from './routes/api';
import 'dotenv/config';
import { errorHandler, notFoundHandler } from './middlewares';
import { initDb } from './db';

const app = express();
const { PORT } = process.env;

function main() {
  try {
    initDb();
    console.log(`App listening on: http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
  }
}

app.use(express.json());

app.use('/api', apiRoute);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, main);
