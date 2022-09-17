/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET, DEV_SECRET } = process.env;

const {
  ServerError,
  NotFoundError,
  CastError,
  ConflictError,
} = require('../constants/errors');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    password,
    email,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        name,
        about,
        avatar,
        password: hashedPassword,
        email,
      })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new CastError(`Переданы некорректные данные при создании пользователя. Поле${err.message.replace('user validation failed:', '').replace(':', '')}`));
          }
          if (err.code === 11000) {
            return next(new ConflictError(`Пользователь с email '${err.keyValue.email}' уже зарегистрирован`));
          }
          return next(new ServerError('Произошла ошибка'));
        });
    })
    .catch(() => {
      next(new ServerError('Произошла ошибка'));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({
        _id: user._id,
      }, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);

      res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
        sameSite: true,
      });

      res.send({ data: user.toJSON() });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => next(new ServerError('Произошла ошибка')));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return next(new NotFoundError(`Пользователь по указанному c id: ${req.params.cardId} не найден`));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Передан некорректный id пользователя'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return next(new NotFoundError(`Пользователь ${req.user} не найден`));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Передан некорректный id пользователя'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

module.exports.editUser = (req, res, next) => {
  const {
    name,
    about,
    owner = req.user._id,
  } = req.body;
  User.findById(owner)
    .then((userFound) => {
      if (!userFound) {
        return next(new NotFoundError(`Пользователь c id: ${owner} не найден`));
      }
      return User.findByIdAndUpdate(owner, {
        name,
        about,
      }, { new: true, runValidators: true })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new CastError(`Переданы некорректные данные при обновлении профиля. Поле${err.message.replace('Validation failed:', '').replace(':', '')}`));
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Передан некорректный id при обновлении профиля'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const {
    avatar,
    owner = req.user._id,
  } = req.body;
  User.findById(owner)
    .then((userFound) => {
      if (!userFound) {
        return next(new NotFoundError(`Пользователь c id: ${owner} не найден`));
      }
      return User.findByIdAndUpdate(owner, {
        avatar,
      }, { new: true, runValidators: true })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new CastError(`Переданы некорректные данные при обновлении профиля. Поле${err.message.replace('Validation failed:', '').replace(':', '')}`));
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Передан некорректный id при обновлении аватара'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};
