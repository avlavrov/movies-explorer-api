const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const errors = require('../errors/errors');
const { wrongEmail, wrongEmailOrPass } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: wrongEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new errors.AuthentificationErrorCode(wrongEmailOrPass);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new errors.AuthentificationErrorCode(wrongEmailOrPass);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
