'use strict';

const bcrypt = require('bcrypt')
const base64 = require('base-64');
const Users = require('../../models/users.js');

module.exports = async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' ')[1];

  console.log('basicheaderparts..', basicHeaderParts);
  //  let encodedString = basicHeaderParts.pop();
  //  console.log(encodedString)
  //  let password = encodedString.split(':').pop();
  //  console.log('password', password)
  let decodedString = base64.decode(basicHeaderParts);
  //  let [username, password] = decodedString.split(':');
  console.log('decoded string..', decodedString);
  let username = decodedString.split(':')[0];
  let password = decodedString.split(':')[1];
  // console.log('username&password', username, password);

  try {
    const user = await Users.findOne({ username: username })
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user)
    }
    else {
      throw new Error('invalid user');
    }
  } catch (error) { res.status(403).send("invalid login"); }
};

// if (!req.headers.authorization) { next('invalid'); }

// let [basic, info] = req.headers.authorization.split(' ');
// if (basic === 'Bearer') {
//   next();
// }
// else {
//   let [user, pass] = base64.decode(info).split(':');
//   console.log(user, pass);
//   try {
//     req.user = await User.authenticateBasic(user, pass)
//     console.log(req.user);
//     next();
//   } catch (e) {
//     res.status(403).send('Invalid Login');
//   }
// }


// module.exports = async (req, res, next) => {
  //   console.log(req.headers);
  //   if (!req.headers.authorization) { next('invalid'); }

  //   let basicAuthParts = req.headers.authorization.split(' ') // authorization '2u98432:023j0jwf -> ['basic', '2u98432:023j0jwf']
  //   let encodedUser = basicAuthParts.pop(); // username:password as base64 -> 2u98432:023j0jwf
  //   let [user, pass] = base64.decode(encodedUser).split(':');

  //   try {
    //     req.user = await User.authenticateBasic(user, pass)
    //     next();
    //   } catch (e) {
      //     res.status(403).send('Invalid Login');
      //   }
      // };



      // module.exports = async function (req, res, next) {
      //   let basicAuthParts = req.headers.authorization.split(' ');
      //   let encodedUser = basicAuthParts.pop();
      //   let decoded = base64.decode(encodedUser);
      //   let [username, password] = decoded.split(':');
      //   try {

      //     const user = await User.findOne({ username: username });
      //     const valid = await bcrypt.compare(password, user.password);
      //     req.userInfo = user
      //     if (valid) {
      //       next()
      //     } else {
      //       next('Invalid Login')
      //     }

      //   } catch {
      //     console.error('Something went wrong..')
      //   }
      // };


