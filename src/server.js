'use strict';

// Pull in 3rd party npm dependencies
// new ones -> bcrypt (crypto for pw management) / base64 (encoding/decoding of username:pw)
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger.js');
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

const app = express();


app.use(express.json());
app.use(logger);


app.use('*', notFoundHandler);
app.use(errorHandler);


// opens access to anyone to use our API


// sign up and sign in come from forms on a frontend - this can process form data

function start(port) {
  app.listen(port, () => {
    console.log(`connected to port ${port}`);
  });
}

module.exports = {
  app: app,
  start: start,
};