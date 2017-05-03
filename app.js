// Require modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Require routes
const index = require('./routes/index');
const movies = require('./routes/movies');

// Init DB
let mongoDbName = 'movies-app';
if(process.env.NODE_ENV === 'test') {
  mongoDbName = 'movies-app-test';
}
mongoose.connect(`mongodb://localhost/${mongoDbName}`);
mongoose.Promise = global.Promise;

// Init Express app
const app = express();

// Use third-party middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes / controllers
app.use('/', index);
app.use('/movies', movies);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.send();
});

// Export module, so it can be required by another module
module.exports = app;

