<<<<<<< HEAD
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const NotFoundError = require("../errors/notFoundError");
const ValidationError = require("../errors/validationError");
const NotUniqueError = require("../errors/NotUniqueError");
=======
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const NotUniqueError = require('../errors/NotUniqueError');
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
<<<<<<< HEAD
    .orFail(new NotFoundError("Пользователь не найден"))
=======
    .orFail(new NotFoundError('Пользователь не найден'))
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
<<<<<<< HEAD
    .orFail(new NotFoundError("Пользователь не найден"))
=======
    .orFail(new NotFoundError('Пользователь не найден'))
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
<<<<<<< HEAD
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("Пользователь не найден"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Ошибка валидации"));
=======
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации'));
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
<<<<<<< HEAD
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("Пользователь не найден"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Ошибка валидации"));
=======
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации'));
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
<<<<<<< HEAD
  const { name, about, avatar, email } = req.body;

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
=======
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })

    .catch((err) => {
<<<<<<< HEAD
      if (err.name === "ValidationError") {
        next(new ValidationError("Ошибка валидации"));
      }
      if (err.code === 11000) {
        return next(new NotUniqueError("Пользователь уже существует"));
=======
      if (err.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации'));
      }
      if (err.code === 11000) {
        return next(new NotUniqueError('Пользователь уже существует'));
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
<<<<<<< HEAD
      const token = jwt.sign({ _id: user._id }, "super-strong-secret");
=======
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
      res.status(200).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
