import express from 'express';
import noteRouter from './routes/note.route.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
app.use(express.json());

app.use("/api", noteRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(errorHandler);

export default app;
