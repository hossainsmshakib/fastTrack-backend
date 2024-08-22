import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { Express } from 'express';
import connectMongoose from './db';
import router from './routers/router';

const app: Express = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(router);

async function bootstrap() {
  try {
    await connectMongoose();
    app.listen(5000, () => {
      console.log('server is running on port 5000');
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
