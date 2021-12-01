const NotFoundError = require('./NotFoundError');
const ValidationErrorCode = require('./ValidationErrorCode');
const AuthentificationErrorCode = require('./AuthentificationErrorCode');
const CastErrorCode = require('./CastErrorCode');
const NotAllowedUserError = require('./NotAllowedUserError');
const UserExistsError = require('./UserExistsError');
const OtherErrorCode = require('./OtherErrorCode');

module.exports = {
  NotFoundError,
  ValidationErrorCode,
  AuthentificationErrorCode,
  CastErrorCode,
  UserExistsError,
  OtherErrorCode,
  NotAllowedUserError,
};
