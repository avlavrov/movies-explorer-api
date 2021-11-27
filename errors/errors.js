class ValidationErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class CastErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class AuthentificationErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class NotAllowedUserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class OtherErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  NotFoundError,
  ValidationErrorCode,
  AuthentificationErrorCode,
  CastErrorCode,
  UserExistsError,
  OtherErrorCode,
  NotAllowedUserError,
};
