'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('../models/users.js');
const basicAuth = require('../middleware/authentication/authentication.js')


authRouter.post('/signup', async (req, res, next) => {
  let user = new User(req.body);
  console.log(req.body);
  const userRecord = await user.save();
  const output = {
    user: userRecord,
    token: userRecord.token
  };
  res.status(200).json(output);
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: request.user,
    token: request.user.token
  };
  res.status(200).json(user);
});

// authRouter.get('/users', bearerAuth, async (req, res, next) => {
//   const users = await User.find({});
//   const list = users.map(user => user.username);
//   res.status(200).json(list);
// });

module.exports = authRouter;