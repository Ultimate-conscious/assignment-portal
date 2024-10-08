import express from 'express';
import { config } from 'dotenv';
config();

const PORT = parseInt(process.env.PORT || '');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})