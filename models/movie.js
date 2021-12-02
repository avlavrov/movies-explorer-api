const mongoose = require('mongoose');
const validator = require('validator');
const { wrongURL } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: wrongURL,
    },
  },
  trailer: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: wrongURL,
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: wrongURL,
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('movie', movieSchema);
