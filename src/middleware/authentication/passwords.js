'use strict';

const bcrypt = require('bcrypt');
const Users = require('../src/models/users.js');

module.exports = async function (req, res, next) {
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
    next();
  } catch {
    // if our hashing doesn't work for some reason on the bcrypt side, return an error to the user
    res.status(500).send('error creating user');
  }
};