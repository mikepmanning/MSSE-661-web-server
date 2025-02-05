require('dotenv').config(); 
const mongoose = require('mongoose');


// Make connection to the db
const uri = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas!')).catch(err => console.error('Could not connect to MongoDB Atlas...', err));

// Store the instance of db so we can listen to events.
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connection Successful!');
});

module.exports = { mongoose, db: mongoose.connection };

