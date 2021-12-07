const jwt = require('jsonwebtoken');
const { jwtDev, authorizationNeeded } = require('../utils/constants');
const errors = require('../errors/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new errors.AuthentificationErrorCode(authorizationNeeded);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : jwtDev,
    );
  } catch (err) {
    throw new errors.AuthentificationErrorCode(authorizationNeeded);
  }

  req.user = payload;
  next();
};
