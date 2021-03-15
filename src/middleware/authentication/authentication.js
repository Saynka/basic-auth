'use strict';

const bcrypt = require('bcrypt')
const base64 = require('base-64');
const Users = require('../../models/users.js');



module.exports = async function (req, res, next) {
  let basicAuthParts = req.headers.authorization.split(' ') // authorization '2u98432:023j0jwf -> ['basic', '2u98432:023j0jwf']
  let encodedUser = basicAuthParts.pop(); // username:password as base64 -> 2u98432:023j0jwf
  let decoded = base64.decode(encodedUser); // username:password
  // destructuring
  let [username, password] = decoded.split(':'); // split at the : (username, password)

  try {
    const user = await Users.findOne({ username: username })
    console.log('user after saved', user);
    // compare the plain text password we pulled off of the req.authorization header
    // and compare it with the plan text password of the user
    // if valid, "valid" will be true
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      res.status(200).json({ loggedIn: true });
    }
  } catch {
    console.error('user could not be retrieved');
  }
};