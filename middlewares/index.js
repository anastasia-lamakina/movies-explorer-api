const errorHandler = require('./error');
const authHandler = require('./auth');
const { requestLogger, errorLogger } = require('./logger');
const limiter = require('./limiter');

module.exports = {
  errorHandler,
  authHandler,
  requestLoggerHandler: requestLogger,
  errorLoggerHandler: errorLogger,
  rateLimiterHandler: limiter,
};
