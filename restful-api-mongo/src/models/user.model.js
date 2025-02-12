import mongoose from 'mongoose';

// Define a schema
const { Schema } = mongoose;

// Create a new Schema for our collection
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: 'User requires a first name'
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    required: 'User requires a last name'
  },
  birthdate: {
    type: Date,
    required: 'User requires a birthdate'
  },
  username: {
    type: String,
    unique: true,
    required: 'User requires a username'
  },
  password: {
    type: String,
    required: 'User requires a password'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.index({ username: 1, email: 1 }, { unique: true });

export default mongoose.model('User', UserSchema);