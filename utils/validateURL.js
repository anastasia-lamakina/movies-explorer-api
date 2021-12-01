const { isURL } = require('validator');
const { errorMessages } = require('./constants');

const validateURL = (url) => {
  const isValidUrl = isURL(url, {
    require_protocol: true,
    protocols: ['http', 'https'],
  });
  if (!isValidUrl) {
    throw new Error(errorMessages.invalidUrl);
  }

  return url;
};

module.exports = validateURL;
