require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { dbAddress } = require('./utils/constants');

const options = {
  // Массив доменов, с которых разрешены кросс-доменные запросы
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    // 'http://mesto.lavrov.nomoredomains.work',
    // 'https://mesto.lavrov.nomoredomains.work',
    'https://avlavrov.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 2000, NODE_ENV, MONGOD_URL } = process.env;
const app = express();

mongoose.connect(
  NODE_ENV === 'production' ? MONGOD_URL : dbAddress,
  {
    useNewUrlParser: true,
  },
);

app.use('*', cors(options)); // ПЕРВЫМ!
app.use(express.json());
app.use(requestLogger);

app.post('/signin', celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  },
), login);
app.post('/signup', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  },
), createUser);

app.use(auth);
app.use('/', routes);

app.use(errorLogger);
// celebrate' errors
app.use(errors());

app.use((req, res) => {
  res
    .status(404)
    .send({
      message: 'ресурс не найден',
    });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      // eslint-disable-next-line no-nested-ternary
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : statusCode === 404
          ? 'ресурс не найден'
          : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
