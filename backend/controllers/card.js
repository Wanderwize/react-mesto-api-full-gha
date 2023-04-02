const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const NotEnoughRightsError = require('../errors/NotEnoughRightsError');

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)

    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      const user = req.user._id;
      const owner = card.owner._id.toString();

      if (user === owner) {
        return Card.deleteOne(card).then(() => res.send(card));
      }
      return next(new NotEnoughRightsError('Недостаточно прав'));
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .then((card) => res.send(card))
    .catch(next);
};

const updateLike = (req, res, next, method) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { [method]: { likes: req.user._id } },

    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};
module.exports.likeCard = (req, res, next) => {
  updateLike(req, res, next, '$addToSet');
};

module.exports.dislikeCard = (req, res, next) => {
  updateLike(req, res, next, '$pull');
};
