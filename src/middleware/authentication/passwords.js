'use strict';

const bcrypt = require('bcrypt');
const Users = require('../../models/users.js');

module.exports = async function (req, res, next) {
  try {
    if (req.body.username && req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new Users(req.body);
      const saveUser = await user.save(req.body)
      req.savedUser = saveUser;
      next();
    } else {
      next('Invalid username or password')
    }

  } catch {
    console.error('Something went wrong..')
  }
};