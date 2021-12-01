const ceh = ((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500 } = err;
  let { message } = err;
  // проверяем статус и выставляем сообщение в зависимости от него
  if (statusCode === 500) {
    message = 'На сервере произошла ошибка';
  } else if (statusCode === 404) {
    message = 'ресурс не найден';
  }
  res
    .status(statusCode)
    .send(message);
  next();
});

module.exports = ceh;
