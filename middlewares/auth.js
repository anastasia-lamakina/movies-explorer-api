const jwt = require('jsonwebtoken');
const { UnauthorizedAccessError } = require('../errors');
const { errorMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie) {
    next(new UnauthorizedAccessError(errorMessages.unauthorizedAccess));
  } else {
    const token = cookie.replace('jwt=', '');

    try {
      req.user = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
    } catch (err) {
      next(new UnauthorizedAccessError(errorMessages.unauthorizedAccess));
    }

    if (!req.user) {
      next(new UnauthorizedAccessError(errorMessages.unauthorizedAccess));
    }
  }

  next();
};
