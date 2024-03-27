import express from 'express';
import apiRoute from './routes/api';
import sequelize from './db/';
import 'dotenv/config';
import { authenticateDBConnection } from './middlewares';

const app = express();
const { PORT } = process.env;

app.use(express.json());

app.use(authenticateDBConnection);

app.use('/api', apiRoute);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`App listening on: http://localhost:${PORT}`);
});
