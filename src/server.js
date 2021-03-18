'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Esoteric Resources
const notFound = require('./middleware/error-handlers/404.js');
const errorHandler = require('./middleware/error-handlers/500.js');
const authRoutes = require('./routes/authentication.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

app.use(notFound);
app.use(errorHandler);


// opens access to anyone to use our API


// sign up and sign in come from forms on a frontend - this can process form data

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};