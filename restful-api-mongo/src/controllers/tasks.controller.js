import Tasks from '../models/tasks.model.js';
import { serverError } from '../utils/handlers.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.json(tasks);
  } catch (err) {
    serverError(err); 
  }
};

export const getAllTasksByUser = async (req, res) => {
  try {
    const tasks = await Tasks.find({ userId: req.user.userId});
    res.json(tasks);
  } catch (err) {
    serverError(err); 
  }
};

export const getTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.taskId;

    const task = await Tasks.findOne({ _id: taskId, userId: userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' }); 
    }
    res.json(task);
  } catch (err) {
    serverError(err); 
  }
};

export const createTask = async (req, res) => {
  const newTask = new Tasks({
    name: req.body.name,
    userId: req.user.userId,
  });
  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask); 
  } catch (err) {
    res.status(400).send(err); 
  }
};

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: req.params.taskId,
        userId: req.user.userId
       },
      req.body,
      { new: true } 
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Tasks.deleteOne({ _id: req.params.taskId, userId: req.user.userId });
     if (deletedTask.deletedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
  } catch (err) {
    serverError(err); 
  }
};