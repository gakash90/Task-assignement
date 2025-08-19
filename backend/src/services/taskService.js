import Task from "../models/task.model.js";
export const getUserTasks = async (userId) => {
  return await Task.find({ userId }).sort('-createdAt');
};

export const createUserTask = async (userId, { title, description }) => {
  return await Task.create({ title, description, userId });
};

export const updateUserTask = async (userId, taskId, updates) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    updates,
    { new: true }
  );
  if (!task) throw new Error('Task not found or unauthorized');
  return task;
};

export const deleteUserTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) throw new Error('Task not found or unauthorized');
  return task;
};
