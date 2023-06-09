import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Mongo DB Connected successfully'.cyan);
  })
  .catch((err) => {
    console.error(err.message);
  });

const app = express();

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

const port = process.env.PORT || 7001;

app.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});
