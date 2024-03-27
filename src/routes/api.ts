import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to the Blog API' });
});

export default router;
