const protectRouteHandler = require('./route');
const errorHandler = require('./error');
const authHandler = require('./auth');
const { requestLogger, errorLogger } = require('./logger');
const limiter = require('./limiter');

module.exports = {
  protectRouteHandler,
  errorHandler,
  authHandler,
  requestLoggerHandler: requestLogger,
  errorLoggerHandler: errorLogger,
  rateLimiterHandler: limiter,
};
