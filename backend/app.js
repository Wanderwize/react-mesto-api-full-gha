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

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

app.use(express.json());

app.use(cors());

app.use(userRouter);
app.use(cardRouter);
app.use(requestLogger);
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regEx.link),
    }),
  }),
  createUser
);
app.use("*", auth, () => {
  throw new NotFoundError("Страница не найдена");
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

module.exports = app;
