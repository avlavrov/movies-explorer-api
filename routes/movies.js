/* eslint-disable no-useless-escape */
const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.delete('/:movieId', deleteMovie);
router.get('/', getMovies);
router.post('/', createMovie);

module.exports = router;
