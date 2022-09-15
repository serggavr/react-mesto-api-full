const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const { linkValidationPattern, idValidationPattern } = require('../constants/validationPattern');
const {
  getUsers, getUser, editUser, editUserAvatar, getCurrentUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUserInfo);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editUser);

router.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().regex(idValidationPattern),
  }),
}), getUser);

router.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().regex(linkValidationPattern),
  }),
}), editUserAvatar);

module.exports = router;
