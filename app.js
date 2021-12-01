require('dotenv').config();
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {
  authRouter,
  usersRouter,
  moviesRouter,
} = require('./routes');
const {
  authHandler,
  errorHandler,
  requestLoggerHandler,
  errorLoggerHandler,
  rateLimiterHandler,
} = require('./middlewares');

const { NODE_ENV, DATABASE_ADDRESS, PORT } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DATABASE_ADDRESS : 'mongodb://localhost:27017/Moviesdb', {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://lamakina.nomoredomains.rocks',
    ],
    credentials: true,
  }),
);

app.use(requestLoggerHandler);
app.use(rateLimiterHandler);

app.use('/', authRouter);

app.use(authHandler);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use(errorLoggerHandler);
app.use(errors());

app.use(errorHandler);

app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {});
