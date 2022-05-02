import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const port = 3000
  const mongoURL = 'mongodb://auth-mongo-srv:27017/auth'

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log('Listening on port 3000');
  });
};

start();
