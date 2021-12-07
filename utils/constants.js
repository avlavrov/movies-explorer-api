const dbAddress = 'mongodb://localhost:27017/moviesdb';
const jwtDev = 'some-secret-key';
const userNotFound = 'Пользователь не найден';
const userIdError = 'Ошибка в id пользователя';
const wrongEmail = 'Проверьте правильность написания email';
const emailExists = 'Такой email уже существует';
const wrongURL = 'Неправильный URL';
const authorizationNeeded = 'Необходима авторизация';
const resourceNotFound = 'Ресурс не найден';
const serverError = 'На сервере произошла ошибка';
const wrongEmailOrPass = 'Неправильные почта или пароль';
const cardNotFound = 'Карточка фильма не найдена';
const notAllowedToDeleteAnothersFilms = 'У вас нет прав удалять чужие фильмы';
const cardIdError = 'Ошибка в id карточки';
const validationError = 'Ошибка валидации ';

module.exports = {
  dbAddress,
  jwtDev,
  userNotFound,
  userIdError,
  wrongEmail,
  emailExists,
  wrongURL,
  authorizationNeeded,
  resourceNotFound,
  serverError,
  wrongEmailOrPass,
  cardNotFound,
  notAllowedToDeleteAnothersFilms,
  cardIdError,
  validationError,
};
