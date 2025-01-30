const User = require('../models/user.model');

exports.getAllUsers = async function (req, res) {
  try {
    const Users = await User.find({});
    res.json(Users);
  } catch (err) {
    res.send(err);
  }
};

exports.getUser = async function (req, res) {
  try {
    const User = await User.findById(req.params.UserId);
    res.json(User);
  } catch (err) {
    res.send(err);
  }
};

exports.createUser = async function (req, res) {
  const newUser = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    birthdate: req.body.birthdate
  });
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.send(err);
  }
};

exports.updateUser = async function (req, res) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.UserId },
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.send(err);
  }
};

exports.deleteUser = async function (req, res) {
  try {
    await User.deleteOne({ _id: req.params.UserId });
    res.json({ msg: 'Deleted successfully.' });
  } catch (err) {
    res.send(err);
  }
};
