const { resourceNotFound } = require('../utils/constants');
const errors = require('../errors/errors');

const notfound = (() => {
  throw new errors.NotFoundError(resourceNotFound);
});

module.exports = notfound;
