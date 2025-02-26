import https from 'https';
import http from 'http';

import express from 'express';
import cors from 'cors';

import chatRoutes from './routes/chat';

const PROTOCOL = process.env.SERVER_PROTOCOL || 'http';
const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = process.env.SERVER_PROT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);

if (PROTOCOL === 'https') {
  const options = {
    // Not ready yet
    keys: '',
    cert: '',
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server is running at https://${HOST}:${PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`HTTP Server is running at http://${HOST}:${PORT}`);
  });
}
