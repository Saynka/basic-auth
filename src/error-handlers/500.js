'use strict';

function errorHandler(err, req, res, next) {
  res.status(500).send({ status: 500, msg: 'broke for some reason' });
}

module.exports = errorHandler;