const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.delete('/:movieId', celebrate(
  {
    params: Joi.object().keys({
      movieId: Joi.string().hex().required().length(24),
    }),
  },
), deleteMovie);
router.get('/', getMovies);
router.post('/', celebrate(
  {
    body: Joi.object().keys({
      nameRU: Joi.string().min(2).max(30).required(),
      nameEN: Joi.string().min(2).max(30).required(),
      country: Joi.string().min(2).max(30).required(),
      director: Joi.string().min(2).max(30).required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().min(5).required(),
      image: Joi.string().min(2).required(),
      trailer: Joi.string().min(2).required(),
      thumbnail: Joi.string().min(2).required(),
      owner: Joi.string().required(),
      movieId: Joi.string().min(2).max(30).required(),
    }),
  },
), createMovie);

module.exports = router;
