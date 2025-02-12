// src/index.js (or whatever your main file is)
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { mongoose, db } from './db-config.js';;
import dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url'; 


import tasksRoutes from './routes/tasks.routes.js'; 
import * as middleware from './middleware/errors.middleware.js'; 
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ************************************
// ROUTE-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

// Handle routes for tasks.
app.use('/api/tasks', tasksRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Handle 404 requests
app.use(middleware.error404);

// Handle 500 requests
// applies mostly to live services
app.use(middleware.error500);

// listen on server port
app.listen(port, () => { // Use arrow function for consistency
  console.log(`Running on port: ${port}...`);
});