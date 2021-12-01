const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

router.post('/signup', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  },
), createUser);

module.exports = router;
