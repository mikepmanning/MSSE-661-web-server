import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as path from 'path'; 
import { fileURLToPath } from 'url'; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

dotenv.config({ path: path.join(__dirname, '../../.env') });


const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  replicaSet: 'atlas-efjsiq-shard-0',
  authSource: 'admin',
  retryWrites: true,
  ssl: true,
};


mongoose.connect(uri, options)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('Could not connect to MongoDB Atlas...', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connection Successful!');
});

export { mongoose, db }; 