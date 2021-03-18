# LAB - Class 6

## Project: Basic-Authorization

### Author: Kale Lesko

### Links and Resources

- [ci/cd](https://password-practice.herokuapp.com/)
- [back-end server url](http://xyz.com)
- [front-end application](http://xyz.com)

### Setup

.
├── LICENSE
├── README.md
├── __tests__
│   └── server.test.js
├── assets
│   └── lab6.png
├── class\ refrences
│   ├── lab\ 7
│   └── lab6
│       ├── auth-server
│       │   ├── app.js
│       │   ├── package-lock.json
│       │   └── package.json
│       └── passwords
│           ├── app.js
│           ├── package-lock.json
│           └── package.json
├── index.js
├── package-lock.json
├── package.json
└── src
    ├── middleware
    │   ├── authentication
    │   │   ├── authentication.js
    │   │   └── passwords.js
    │   └── error-handlers
    │       ├── 404.js
    │       └── 500.js
    ├── models
    │   └── users.js
    ├── routes
    │   └── authentication.js
    └── server.js


#### `.env` requirements

- `PORT` - 3333
- `MONGODB_URI` - mongodb://localhost:27017/basic-auth

##### auth-server

- base-64
- bcrypt
- cors
- express
- mongoose

##### passwords

- base-64
- bcrypt

#### How to initialize/run your application

- `npm init -y`
- `npm start`
- `node index.js`

#### How to use your library

#### Tests

- How do you run tests?
- Any tests of note?
- Describe any tests that you did not complete, skipped, etc

#### UML

![UML Example](./assets/lab6.png)
