const Card = require('../models/movie');
const errors = require('../errors/errors');
const {
  cardNotFound,
  notAllowedToDeleteAnothersFilms,
  cardIdError,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createMovie = (req, res, next) => {
  // const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ ...req.body, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new errors.ValidationErrorCode(`Ошибка валидации ${err.message}`);
      }
      throw err;
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Card.findById(req.params.movieId)
    .then((card) => {
      if (!card) {
        throw new errors.NotFoundError(cardNotFound);
      }
      if (card.owner.toString() !== req.user._id) {
        throw new errors.NotAllowedUserError(notAllowedToDeleteAnothersFilms);
      }
      return Card.findByIdAndDelete(card._id)
        .then((c) => res.status(200).send(c));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new errors.CastErrorCode(cardIdError);
      }
      next(err);
    })
    .catch(next);
};

// const putLikeOnCard = (req, res, next) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $addToSet: { likes: req.user._id } },
//   { new: true },
// )
//   .then((card) => {
//     if (card) {
//       return res.status(200).send(card);
//     }
//     throw new errors.NotFoundError(cardNotFound);
//   })
//   .catch((err) => {
//     if (err.name === 'CastError') {
//       throw new errors.CastErrorCode(cardIdError);
//     }
//     next(err);
//   })
//   .catch(next);

// const deleteLikeOnCard = (req, res, next) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $pull: { likes: req.user._id } },
//   { new: true },
// )
//   .then((card) => {
//     if (card) {
//       return res.status(200).send(card);
//     }
//     throw new errors.NotFoundError(cardNotFound);
//   })
//   .catch((err) => {
//     if (err.name === 'CastError') {
//       throw new errors.CastErrorCode(cardIdError);
//     }
//     next(err);
//   })
//   .catch(next);

module.exports = {
  getMovies, deleteMovie, createMovie,
  // putLikeOnCard, deleteLikeOnCard,
};
