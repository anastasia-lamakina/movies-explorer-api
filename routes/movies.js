const { celebrate, Joi } = require('celebrate');
const express = require('express');
const {
  saveMovie,
  deleteMovieById,
  getMovies,
} = require('../controllers/movies');
const validateURL = require('../utils/validateURL');

const router = express.Router();

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(validateURL),
      trailer: Joi.string().required().custom(validateURL),
      thumbnail: Joi.string().required().custom(validateURL),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number(),
    }),
  }),
  saveMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: {
      movieId: Joi.string().length(24).hex(),
    },
  }),
  deleteMovieById,
);

module.exports = router;
