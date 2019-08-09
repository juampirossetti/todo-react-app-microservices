//load express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const User = require('./User');
const userRoutes = require('./users.routes');

//load mongoose
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';

if(env === 'test'){
  process.env.MONGODB_URI = 'mongodb://dev-user:dev123@ds261277.mlab.com:61277/microservices-test';
} else {
  process.env.MONGODB_URI = 'mongodb://dev-user:dev123@ds259577.mlab.com:59577/microservices';
}
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', userRoutes);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message, data: err.data });
});

app.listen(3000, () => {
  console.log('Running server on port 3000!');
});

module.exports = app; // for testing

