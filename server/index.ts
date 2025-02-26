import express from 'express';
import cors from 'cors';

import chatRoutes from './routes/chat';

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
