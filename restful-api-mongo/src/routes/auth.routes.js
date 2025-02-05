const express = require('express')
const controller = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const authRoutes = express.Router();

authRoutes.post('/register', userController.createUser);

authRoutes.post('/login', controller.login);

module.exports = authRoutes;