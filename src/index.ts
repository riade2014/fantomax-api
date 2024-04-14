import express from 'express';
import dotenv from 'dotenv';
import * as firebase from "firebase/app";
import routes from "./router";
const cors = require('cors');

const firebaseConfig = {
    apiKey: "AIzaSyA6Er3qwF5_wvWb1t_ntFUJKtvWtb-Chws",
    authDomain: "task-manager-projectweb.firebaseapp.com",
    projectId: "task-manager-projectweb",
    storageBucket: "task-manager-projectweb.appspot.com",
    messagingSenderId: "741497584060",
    appId: "1:741497584060:web:f8c2cf57d940b1484413b9",
    measurementId: "G-70ZEEF06J0"
  };

// Initialisation Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
dotenv.config();

const app = express();
const port = process.env.PORT ;


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api-v1', routes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
