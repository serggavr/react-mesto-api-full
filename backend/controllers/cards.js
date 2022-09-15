const Card = require('../models/card');
const {
  ServerError,
  NotFoundError,
  CastError,
  ForbiddenError,
} = require('../constants/errors');

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
    owner = req.user._id,
  } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError(`Переданы некорректные данные при обновлении профиля. Поле${err.message.replace('card validation failed:', '').replace(':', '')}`));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => next(new ServerError('Произошла ошибка')));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id.toString()) {
          Card.findByIdAndRemove(req.params.cardId)
            .then(() => res.send({ message: 'Карточка удалена' }))
            .catch(() => next(new ServerError('Произошла ошибка')));
        } else {
          return next(new ForbiddenError('Доступ запрещен'));
        }
      } else {
        return next(new NotFoundError(`Карточка c id: ${req.params.cardId} не найдена`));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Переданы некорректные данные при удалении карточки'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

module.exports.likeCard = (req, res, next) => {
  const {
    owner = req.user._id,
  } = req.body;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return next(new NotFoundError(`Карточка c id: ${req.params.cardId} не найдена`));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError(' Переданы некорректные данные для постановки лайка'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const {
    owner = req.user._id,
  } = req.body;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return next(new NotFoundError(`Карточка c id: ${req.params.cardId} не найдена`));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError(' Переданы некорректные данные для cнятия лайка'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};
