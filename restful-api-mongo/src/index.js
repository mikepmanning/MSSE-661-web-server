const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db-config');
require('dotenv').config(); 

const tasksRoutes = require('./routes/tasks.routes');
const middleware = require('./middleware/errors.middleware');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';



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
app.listen(port, function() {
  console.log(`Running on port: ${port}...`);
});
