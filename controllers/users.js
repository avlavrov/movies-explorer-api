const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {
  jwtDev,
  userNotFound,
  userIdError,
  wrongEmail,
  emailExists,
} = require('../utils/constants');
const User = require('../models/user');
const errors = require('../errors/errors');

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new errors.NotFoundError(userNotFound);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new errors.CastErrorCode(userIdError);
      }
      next(err);
    })
    .catch(next);
};

// const getUser = (req, res, next) => {
//   User.findById(req.params.userId)
//     .then((user) => {
//       if (!user) {
//         throw new errors.NotFoundError(userNotFound);
//       }
//       return res.status(200).send(user);
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         throw new errors.CastErrorCode(userIdError);
//       }
//       next(err);
//     })
//     .catch(next);
// };

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!validator.isEmail(email)) {
    throw new errors.ValidationErrorCode(wrongEmail);
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new errors.UserExistsError(emailExists);
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        })
          .then(() => {
            res.status(200).send({
              name, about, avatar, email,
            });
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              throw new errors.ValidationErrorCode(`Ошибка валидации ${err.message}`);
            }
            throw err;
          })
          .catch(next));
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new errors.UserExistsError(emailExists);
      }
      User.findByIdAndUpdate(
        req.user._id,
        { name, email },
        { runValidators: true, new: true },
      )
        .then((u) => {
          if (!u) {
            throw new errors.NotFoundError(userNotFound);
          }
          return res.status(200).send(u);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      if (!user) {
        throw new errors.NotFoundError(userNotFound);
      }

      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtDev,
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  getMe,
  // getUser,
  createUser,
  updateUser,
  login,
};
