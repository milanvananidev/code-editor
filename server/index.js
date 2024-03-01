import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './database/db.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

import userRouter from './routes/user.js';

const app = express();

dotenv.config();

// Connect to database
connectDB();

// Using middlewares
app.use(cors());
app.use(express.json());

// App Routes
app.use('/api/user', userRouter);

// Error Handler
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log('server is working on PORT', process.env.PORT)
});