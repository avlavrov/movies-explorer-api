const jwt = require('jsonwebtoken');
const errors = require('../errors/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new errors.AuthentificationErrorCode('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    throw new errors.AuthentificationErrorCode('Необходима авторизация');
  }

  req.user = payload;
  next();
};
