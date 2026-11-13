import express from 'express';
import noteRouter from './routes/note.route.js';

const app = express();
app.use(express.json());

app.use("/api", noteRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;
