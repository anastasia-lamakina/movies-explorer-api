const { errorMessages } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: errorMessages.serverError });
  }
  next();
};

module.exports = errorHandler;
