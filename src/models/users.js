'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Adds a virtual field to the schema. We can see it, but it never persists
// So, on every user object ... this.token is now readable!
// users.virtual('token').get(function () {
//   let tokenObject = {
//     username: this.username,
//   }
//   return jwt.sign(tokenObject)
// });

users.pre('save', async function () {
  this.password = bcrypt.hash(this.password, 10);
});

// BASIC AUTH
users.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ username })
  console.log(user);
  const valid = await bcrypt.compare(password, user.password)
  console.log(valid)
  if (valid) { return user; }
  throw new Error('Invalid User');
}

module.exports = mongoose.model('users', users);