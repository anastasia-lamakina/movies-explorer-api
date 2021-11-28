const { NotFoundError, UnauthorizedAccessError } = require('../errors');
const { errorMessages } = require('../utils/constants');

const protectRouteHandler = (req, res, next) => {
  if (req.user) {
    next(new NotFoundError(errorMessages.pageNotFound));
  } else {
    next(new UnauthorizedAccessError(errorMessages.unauthorizedAccess));
  }
};

module.exports = protectRouteHandler;
