import express from 'express';
import * as controllers from '../controllers/user.controller.js';
import verifyToken from '../middleware/auth.middleware.js';

const userRoutes = express.Router();

/**
 * Express routes for Users.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all users. Evaluates to `/api/user/`.
 */
userRoutes.route('/')
  .get(controllers.getAllUsers)
  .post(controllers.createUser);

/**
 * Routes for a user by id. Evalutes to `/api/user/:userId`.
 */
userRoutes.route('/me')
    .get(controllers.getMe)

userRoutes.route('/:userId')
    .get(controllers.getUser)
    .delete(controllers.deleteUser);

userRoutes.route('/me/update')
    .put(verifyToken, controllers.updateMe); 

userRoutes.route('/:userId')
  .put(controllers.updateUser); 

export default userRoutes;