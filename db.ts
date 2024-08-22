import mongoose from 'mongoose';

const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'fasttrack';

async function connectMongoose() {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`);
    console.log('DB connected');
  } catch (error) {
    console.log(error);
  }
}

export default connectMongoose;
