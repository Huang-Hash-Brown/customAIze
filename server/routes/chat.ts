import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  res.json({ reply: `1111` });
});

export default router;
