import express from 'express';
import dotenv from 'dotenv';
import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "task-manager-projectweb.firebaseapp.com",
    projectId: "task-manager-projectweb",
    storageBucket: "task-manager-projectweb.appspot.com",
    messagingSenderId: "741497584060",
    appId: "1:741497584060:web:f8c2cf57d940b1484413b9",
    measurementId: "G-70ZEEF06J0"
  };

// Initialisation Firebase
 const firebaseApp = firebase.initializeApp(firebaseConfig);
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
