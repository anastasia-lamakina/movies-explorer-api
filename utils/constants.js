const errorMessages = {
  userNotFound: 'Запрашиваемый пользователь не найден.',
  userConflict: 'Пользователь с этим имейл адресом уже существует.',
  movieForbiddenDelete: 'Невозможно удалить фильм сохраненный другим пользователем.',
  movieNotFound: 'Фильм с указанным id не найден.',
  incorrectDataPassed: 'Переданы некорректные данные ',
  incorrectIdPassed: 'Передан некорректный id',
  unauthorizedAccess: 'Необходима авторизация',
  serverError: 'На сервере произошла ошибка.',
  pageNotFound: 'Страница не найдена',
  invalidUrl: 'Передан некоректный url',
};

module.exports = {
  errorMessages,
};
