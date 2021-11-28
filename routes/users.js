const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { updateUser, getUser } = require('../controllers/users');

const router = express.Router();

router.get('/me', getUser);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

module.exports = router;
