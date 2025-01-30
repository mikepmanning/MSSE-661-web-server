const Tasks = require('../models/tasks.model');

exports.getAllTasks = async function (req, res) {
  try {
    const tasks = await Tasks.find({});
    res.json(tasks);
  } catch (err) {
    res.send(err);
  }
};

exports.getTask = async function (req, res) {
  try {
    const task = await Tasks.findById(req.params.taskId);
    res.json(task);
  } catch (err) {
    res.send(err);
  }
};

exports.createTask = async function (req, res) {
  const newTask = new Tasks({
    name: req.body.name,
  });
  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.send(err);
  }
};

exports.updateTask = async function (req, res) {
  try {
    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: req.params.taskId },
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.send(err);
  }
};

exports.deleteTask = async function (req, res) {
  try {
    await Tasks.deleteOne({ _id: req.params.taskId });
    res.json({ msg: 'Deleted successfully.' });
  } catch (err) {
    res.send(err);
  }
};
