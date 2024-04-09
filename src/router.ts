import express from 'express';
import UserController from './controllers/userController';

const router = express.Router();

// Route pour créer un nouvel utilisateur
router.post('/register', express.json(), UserController.registerUser);
router.post('/login', express.json(), UserController.loginUser);

export default router;
