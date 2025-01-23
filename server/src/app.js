/* eslint-disable quotes */
const express = require('express');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');

const accountRouter = require('./routes/accountRouter');
const tokensRouter = require('./routes/tokensRouter');

const ordersRouter = require('./routes/ordersRouter');
const usersRouter = require('./routes/usersRouter');
const cartsRouter = require('./routes/cartsRouter');


const app = express();

//
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.use('/api/account', accountRouter);
app.use('/api/tokens', tokensRouter);

//
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);

app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);




module.exports = app;
