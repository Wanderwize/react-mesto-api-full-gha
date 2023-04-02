<<<<<<< HEAD
const express = require("express");

const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const { celebrate, Joi } = require("celebrate");
const NotFoundError = require("./errors/notFoundError");
const regEx = require("./utils/regex");
const userRouter = require("./routes/user");
const { login, createUser } = require("./controllers/user");
const cardRouter = require("./routes/card");
const errorHandler = require("./errors/errorHandler");
const cors = require("cors");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://0.0.0.0:27017/mestodb", {
=======
const express = require('express');

const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const NotFoundError = require('./errors/notFoundError');
const regEx = require('./utils/regex');
const userRouter = require('./routes/user');
const { login, createUser } = require('./controllers/user');
const cardRouter = require('./routes/card');
const errorHandler = require('./errors/errorHandler');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

app.use(express.json());

app.use(cors());
<<<<<<< HEAD
app.use(userRouter);
app.use(cardRouter);
app.use(requestLogger);

app.post(
  "/signin",
=======

app.use(userRouter);
app.use(cardRouter);
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post(
  '/signin',
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
<<<<<<< HEAD
  login
);
app.post(
  "/signup",
=======
  login,
);
app.post(
  '/signup',
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regEx.link),
    }),
  }),
<<<<<<< HEAD
  createUser
);
app.use("*", auth, () => {
  throw new NotFoundError("Страница не найдена");
=======
  createUser,
);
app.use('*', auth, () => {
  throw new NotFoundError('Страница не найдена');
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

module.exports = app;
<<<<<<< HEAD


=======
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
