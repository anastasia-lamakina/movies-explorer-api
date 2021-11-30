const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors');
const Movie = require('../models/movie');
const { errorMessages } = require('../utils/constants');

const saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            errorMessages.incorrectDataPassed,
          ),
        );
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === req.user._id) {
          return Movie.findByIdAndDelete(req.params.movieId).then((deletedMovie) => {
            res.send(deletedMovie);
          });
        }
        throw new ForbiddenError(
          errorMessages.movieForbiddenDelete,
        );
      } else {
        throw new NotFoundError(errorMessages.movieNotFound);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.incorrectIdPassed));
      } else {
        next(err);
      }
    });
};

module.exports = {
  saveMovie,
  getMovies,
  deleteMovieById,
};
