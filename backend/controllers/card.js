<<<<<<< HEAD
const Card = require("../models/card");
const NotFoundError = require("../errors/notFoundError");
const ValidationError = require("../errors/validationError");
const NotEnoughRightsError = require("../errors/NotEnoughRightsError");
=======
const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const NotEnoughRightsError = require('../errors/NotEnoughRightsError');
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)

<<<<<<< HEAD
    .orFail(new NotFoundError("Карточка не найдена"))
=======
    .orFail(new NotFoundError('Карточка не найдена'))
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
    .then((card) => {
      const user = req.user._id;
      const owner = card.owner._id.toString();

      if (user === owner) {
        return Card.deleteOne(card).then(() => res.send(card));
      }
<<<<<<< HEAD
      return next(new NotEnoughRightsError("Недостаточно прав"));
=======
      return next(new NotEnoughRightsError('Недостаточно прав'));
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
<<<<<<< HEAD
      if (err.name === "ValidationError") {
        next(new ValidationError("Некорректные данные при создании карточки"));
=======
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные при создании карточки'));
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

const updateLike = (req, res, next, method) => {
  const { cardId } = req.params;

  if (cardId.length === 24) {
    Card.findByIdAndUpdate(
      cardId,
      { [method]: { likes: req.user._id } },

<<<<<<< HEAD
      { new: true }
    )
      .orFail(new NotFoundError("Карточка не найдена"))
=======
      { new: true },
    )
      .orFail(new NotFoundError('Карточка не найдена'))
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
      .then((card) => {
        res.send(card);
      })
      .catch(next);
  }
};
module.exports.likeCard = (req, res, next) => {
<<<<<<< HEAD
  updateLike(req, res, next, "$addToSet");
};

module.exports.dislikeCard = (req, res, next) => {
  updateLike(req, res, next, "$pull");
=======
  updateLike(req, res, next, '$addToSet');
};

module.exports.dislikeCard = (req, res, next) => {
  updateLike(req, res, next, '$pull');
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
};

// module.exports.likeCard = (req, res, next) => {
//   const { cardId } = req.params;
//   if (cardId.length === 24) {
//     Card.findByIdAndUpdate(
//       cardId,
//       { $addToSet: { likes: cardId } },
//       { new: true }
//     )
//       .populate("likes", "owner")
//       .orFail(new NotFoundError("Карточка не найдена"))
//       .then(() => res.send(cardId))
//       .catch(next);
//   }
// };

// module.exports.dislikeCard = (req, res, next) => {
//   const { cardId } = req.params;
//   if (cardId.length === 24) {
//     Card.findByIdAndUpdate(cardId, { $pull: { likes: cardId } }, { new: true })
//       .populate("likes", "owner")
//       .orFail(new NotFoundError("Карточка не найдена"))
//       .then(() => res.send(cardId))
//       .catch(next);
//   }
// };
