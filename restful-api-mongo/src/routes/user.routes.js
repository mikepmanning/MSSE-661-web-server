const controllers = require('../controllers/user.controller');
const express = require('express');
const verifyToken = require('../middleware/auth.middleware');

const userRoutes = express.Router();
/**
 * Express routes for Users.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all users. Evaluates to `/user/`.
 */
userRoutes.get('/', controllers.getAllUsers).post('/', controllers.createUser);

/**
 * Routes for a user by id. Evalutes to `/user/:userId`.
 */
userRoutes
  .get('/me', controllers.getMe)
  .get('/:userId', controllers.getUser)
  .post('/me/update', verifyToken, controllers.updateMe)
  .post('/:userId', controllers.updateUser)
  .delete('/:userId', controllers.deleteUser);

  module.exports = userRoutes;
