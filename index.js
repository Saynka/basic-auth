'use strict';

require('dotenv').config();
// Pull in 3rd party npm dependencies
// new ones -> bcrypt (crypto for pw management) / base64 (encoding/decoding of username:pw)
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3333;

const app = express();



mongoose.connect('mongodb://localhost:27017/basic-auth', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log('server up:', PORT);
    });
  })
  .catch(e => console.error('db error', e.message));