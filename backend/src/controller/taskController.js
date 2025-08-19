import {
  getUserTasks,
  createUserTask,
  updateUserTask,
  deleteUserTask
} from '../services/taskService.js';
import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await getUserTasks(req.user._id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  try {
    const task = await Task.create({
      title,
      description,
      userId: req.user._id
    });
    console.log('Created Task:', task);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}; 

export const updateTask = async (req, res) => {
  try {
    const task = await updateUserTask(req.user._id, req.params.id, req.body);
    res.json(task);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await deleteUserTask(req.user._id, req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
