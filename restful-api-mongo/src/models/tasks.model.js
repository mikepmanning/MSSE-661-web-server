import mongoose from 'mongoose';

// Define a schema
const { Schema } = mongoose;

// Create a new Schema for our collection
const TasksSchema = new Schema({
  name: {
    type: String,
    required: 'A task name is required to create a new task'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  }
});

TasksSchema.index({ name: 1 });

// Expose the collections functions for use in our controller
export default mongoose.model('Tasks', TasksSchema);