import express from 'express';
import dotenv from 'dotenv';

// Initialisation of dotenv 
dotenv.config();

const app = express();
const port = process.env.PORT ;

app.get('/', (req, res) => {
  res.send('Bienvenue sur thefantomax');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
