const mongoose = require('mongoose');
const validateURL = require('../utils/validateURL');

const movieSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validateURL,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: validateURL,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: validateURL,
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
