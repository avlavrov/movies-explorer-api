require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { dbAddress } = require('./utils/constants');
const ceh = require('./middlewares/ceh');

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

app.use(routes);

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

app.use(ceh);

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
