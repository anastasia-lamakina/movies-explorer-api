const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { createUser, login, signout } = require('../controllers/users');

const router = express.Router();

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

router.post(
  '/signout',
  signout,
);

module.exports = router;
