'use strict';

module.exports = (req, res) => {
  res.status(500).send({ status: 500, msg: 'broke for some reason' });
  next();
}
