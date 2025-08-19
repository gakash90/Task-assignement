import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getTasks, createTask,updateTask,deleteTask } from '../controller/taskController.js';
const taskrouter = Router();

taskrouter.use(authMiddleware);

taskrouter.get('/', getTasks);
taskrouter.post('/', createTask);
taskrouter.put('/:id', updateTask);
taskrouter.delete('/:id', deleteTask);

export default taskrouter;
