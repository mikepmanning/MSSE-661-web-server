import User from '../models/user.model.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as jwtconfig from '../jwt-config.js'; 

const getUserWithoutPassword = (user) => {
  if (!user) {
    return null;
  }
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const verifyJWT = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const usersWithoutPasswords = users.map(getUserWithoutPassword);
    res.json(usersWithoutPasswords);
  } catch (err) {
    res.status(500).send(err); 
  }
};

export const getUser = async (req, res) => {
  try {
    console.log(req.params);
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); 
    }
    res.json(getUserWithoutPassword(user));
  } catch (err) {
     if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid User ID' }); 
    }
    res.status(500).send(err);
  }
};



export const createUser = async (req, res) => {
  try {
      //encrypt the password before it's saved to the db.
    const passwordHash = bcrypt.hashSync(req.body.password);

    const newUser = new User({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: passwordHash,
      email: req.body.email,
      birthdate: req.body.birthdate
    });
    const savedUser = await newUser.save();
    res.status(201).json(getUserWithoutPassword(savedUser)); 
  } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message }); 
        }
    res.status(500).send(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password); 
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.UserId },
      req.body,
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(getUserWithoutPassword(updatedUser));
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid User ID' }); 
    }
     if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message }); 
        }
    res.status(500).send(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.userId });
     if (deletedUser.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid User ID' });
    }
    res.status(500).send(err);
  }
};



export const getMe = async (req, res) => {
  const token = req.headers['auth-token'];

  if (!token) {
    return res.status(401).send({ success: false, message: 'No token provided' }); // return
  }

  try {
    const decoded = await verifyJWT(token, jwtconfig.secret);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json(getUserWithoutPassword(user));
  } catch (err) {
    res.status(403).json({ success: false, message: 'Failed to authenticate token' });
  }
};

export const updateMe = async (req, res) => {
  console.log("Entering updateMe method");
  req.params.UserId = req.user.userId;  //Keep this line to make the function call easier
  return updateUser(req, res); // Use the named export!  This is key.
};