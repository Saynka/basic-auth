'use strict';

const base64 = require('base-64');
const User = require('../../models/users.js');

module.exports = async (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.authorization) {
    return
    _authError();
  }
  let basicAuthParts = req.headers.authorization.split(' ') // authorization '2u98432:023j0jwf -> ['basic', '2u98432:023j0jwf']
  let encodedUser = basicAuthParts.pop(); // username:password as base64 -> 2u98432:023j0jwf
  let [user, pass] = base64.decode(encodedUser).split(':');

  try {
    req.user = await User.authenticateBasic(user, pass)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}