const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedAccessError,
} = require('../errors');
const User = require('../models/user');
const { errorMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => res.status(200).send({
        name: user.name,
        email: user.email,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(
            new BadRequestError(
              errorMessages.incorrectDataPassed,
            ),
          );
        } else if (err.name === 'MongoServerError' && err.code === 11000) {
          next(
            new ConflictError(
              errorMessages.userConflict,
            ),
          );
        } else {
          next(err);
        }
      });
  }).catch();
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(errorMessages.userNotFound);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            errorMessages.incorrectDataPassed,
          ),
        );
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        next(
          new ConflictError(
            errorMessages.userConflict,
          ),
        );
      } else if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.incorrectIdPassed));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });

      res.status(200).send({ _id: user._id });
    })
    .catch((err) => {
      next(new UnauthorizedAccessError(err.message));
    });
};

const signout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send();
};

const getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  login,
  signout,
};
