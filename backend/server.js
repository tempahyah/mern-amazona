// import express from 'express';
// import path from 'path';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import colors from 'colors';
// import seedRouter from './routes/seedRoutes.js';
// import productRouter from './routes/productRoutes.js';
// import userRouter from './routes/userRoutes.js';
// import orderRouter from './routes/orderRoutes.js';

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');
// const seedRouter = require('./routes/seedRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAIL_CLIENT_ID || 'sb');
});

// app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

__dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
// const port = process.env.PORT || 7001;

app.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});
