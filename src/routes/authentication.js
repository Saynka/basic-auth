'use strict';

const express = require('express');
const password = require('../middleware/autentication/passwords.js')
const auth = require('../middleware/authentication/authentication.js')

const router = express.Router();


router.post('/signup', auth, async (req, res) => {
  try {
    // immediately pull the password off of the req body on sign up
    // then hash it and put it back on the req body
    req.body.password = await bcrypt.hash(req.body.password, 5);
    // instantiation of our new user with a username and a password
    const user = new Users(req.body);
    console.log('after instantiation of model:', user);
    // save that user to the database
    const record = await user.save(req.body);
    console.log('after saving the record in the db', record);
    // FOR NOW:  send back the user details - in the future we will send back pages and/or auth tokens
    res.status(200).json(record); // this is only for learning purposes, we normally do not send back a user object with password data
  } catch {
    // if our hashing doesn't work for some reason on the bcrypt side, return an error to the user
    res.status(500).send('error creating user');
  }
});

// SIGN IN will pull the username:password off of a "authorization" header
// the username:password will already be base 64 encoded at that time
// we decoded it, find the user in the db, check the db password (hashed) against the user password provided
router.post('/signin', password, async (req, res) => {
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
});

module.exports = router;