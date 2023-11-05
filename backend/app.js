const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes/index');

const { login } = require('./controllers/users');
const { createUser } = require('./controllers/users');

const { validateProfile } = require('./validators/user-validator');
const NotFoundError = require('./errors/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

// const { PORT = 3000 } = process.env;
// const MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb';
// prettier-ignore
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', validateProfile, login);
app.post('/signup', validateProfile, createUser);

app.use(router);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? 'На сервере произошла ошибка.' : message,
  });
  next();
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('connected to Database!');
  })
  .catch(() => {
    console.log('connection to database failed');
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
