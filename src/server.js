'use strict';

// Pull in 3rd party npm dependencies
// new ones -> bcrypt (crypto for pw management) / base64 (encoding/decoding of username:pw)
const express = require('express');
const authRoute = reqire('./routes/authentication.js')
const notFoundHandler = require('./middleware/error-handlers/404.js');
const errorHandler = require('./middleware/error-handlers/500.js');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(authRoute);

app.use('*', notFoundHandler);
app.use(errorHandler);


// opens access to anyone to use our API


// sign up and sign in come from forms on a frontend - this can process form data

module.exports = {
  app: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Now connected on port: ${port}`);
    });
  }
};