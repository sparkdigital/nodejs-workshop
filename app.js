// Require modules
const express = require('express');
const bodyParser = require('body-parser');

// Require routes
const index = require('./routes/index');
const movies = require('./routes/movies');

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

