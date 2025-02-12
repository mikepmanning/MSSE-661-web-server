import express from 'express';
import * as controllers from '../controllers/tasks.controller.js';

const tasksRoutes = express.Router();

/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/api/tasks/`.  <- Added /api
 */
tasksRoutes.route('/')
  .get(controllers.getAllTasks)
  .post(controllers.createTask);

/**
 * Routes for a task by id. Evalutes to `/api/tasks/:taskId`. <- Added /api
 */
tasksRoutes.route('/:taskId')
  .get(controllers.getTask)
  .put(controllers.updateTask)  // Changed post to put for updating
  .delete(controllers.deleteTask);

export default tasksRoutes;