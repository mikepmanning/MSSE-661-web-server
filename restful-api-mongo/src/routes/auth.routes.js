// routes/auth.routes.js (ESM - NEW)
import express from 'express';
import * as controller from '../controllers/auth.controller.js'; 
import * as userController from '../controllers/user.controller.js';

const authRoutes = express.Router();

authRoutes.post('/register', userController.createUser);

authRoutes.post('/login', controller.login);

export default authRoutes;