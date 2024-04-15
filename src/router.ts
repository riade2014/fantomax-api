import express from 'express';
import taskController from './controllers/taskController';
import UserController from './controllers/userController';
import { isAuthenticated } from './middleware/authMiddleware';

const router = express.Router();

router.post('/register', express.json(), UserController.registerUser);
router.post('/login', express.json(), UserController.loginUser);

router.post('/:uid/createTask',isAuthenticated ,express.json(), taskController.createTask);
router.get('/:uid/tasks-list', isAuthenticated, express.json(), taskController.getListTasks);
router.get('/:taskId', isAuthenticated, taskController.getTaskById);
router.put('/updateTask/:taskId', isAuthenticated, express.json(), taskController.updateTask);
router.delete('/deleteTask/:taskId', isAuthenticated, taskController.deleteTask);

export default router;
