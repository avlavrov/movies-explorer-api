const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  // getUsers,
  // getUser,
  getMe,
  updateUser,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch('/me', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
    }),
  },
), updateUser);

// router.get('/:userId', celebrate(
//   {
//     params: Joi.object().keys({
//       userId: Joi.string().required().length(24),
//     }),
//   },
// ), getUser);

// router.get('/', getUsers);

module.exports = router;
