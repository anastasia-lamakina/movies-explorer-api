const NotFoundError = require('./notFoundError');
const UnauthorizedAccessError = require('./unauthorizedAcessError');
const BadRequestError = require('./badRequestError');
const ConflictError = require('./conflictError');
const ForbiddenError = require('./forbiddenError');

module.exports = {
  NotFoundError,
  UnauthorizedAccessError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
};
