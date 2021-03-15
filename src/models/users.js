'use strict'

const mongoose = require('mongoose');

// mongoose schema (blueprint for our db data) -> normally, this would live in another file (models/resource/resource.js)
const usersSchema = mongoose.Schema({ // note: mongoose.Schema is a constructor
  username: { type: String, required: true },
  password: { type: String, required: true }
})

// assigning the User model so that we can start adding users to the db
// this also creates a "users" collection in the database (similar idea as a table)
const Users = mongoose.model('users', usersSchema);

module.exports = Users;