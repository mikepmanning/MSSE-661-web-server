import Tasks from '../models/tasks.model.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err); 
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' }); 
    }
    res.json(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createTask = async (req, res) => {
  const newTask = new Tasks({
    name: req.body.name,
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
      { _id: req.params.taskId },
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
    const deletedTask = await Tasks.deleteOne({ _id: req.params.taskId });
     if (deletedTask.deletedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};