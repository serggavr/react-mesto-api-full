const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const { linkValidationPattern, idValidationPattern } = require('../constants/validationPattern');
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().regex(idValidationPattern),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().regex(idValidationPattern),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().regex(idValidationPattern),
  }),
}), dislikeCard);
router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(linkValidationPattern),
  }),
}), createCard);

module.exports = router;
