const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config(); 


const tasksRoutes = require('./routes/tasks.routes');
const middleware = require('./middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Make connection to the db
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => console.log('Connected to MongoDB Atlas!')).catch(err => console.error('Could not connect to MongoDB Atlas...', err));

// Store the instance of db so we can listen to events.
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connection Successful!');
});

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/tasks', tasksRoutes);

// Handle 404 requests
app.use(middleware.error404);

// Handle 500 requests - applies mostly to live services
app.use(middleware.error500);

// listen on server port
app.listen(port, middleware.logger(port));
