const { isURL } = require('validator');

const validateURL = (url) => isURL(url, {
  require_protocol: true,
  protocols: ['http', 'https'],
}) && url;

module.exports = validateURL;
