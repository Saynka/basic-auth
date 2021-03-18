'use strict';

function errorHandler(req, res) {
  res.status(500).send({ status: 500, msg: 'broke for some reason' });
}

module.exports = errorHandler;