import { JWT_TOKEN_KEY } from './const.js';
import { createHero } from './createHero.js';
import { getLogin } from './serviceAPI.js';
import { renderNavigation } from './renderNavigation.js';
import { createWishlist } from './createWishlist.js';
import { createEditProfile } from './createEditProfile.js';
import { createEditWish } from './createEditWish.js';

// Создаем маршрутизатор
export const router = Router();
const token = localStorage.getItem(JWT_TOKEN_KEY);
// получить информацию о пользователе по токену
export const auth = token ? await getLogin(token) : {};
// Если не удалось получить информацию о пользователе, удаляем токен
if (!auth.login) {
  localStorage.removeItem(JWT_TOKEN_KEY);
}

// Флаг для отслеживания нахождения на главной странице
let isMainPage = true;

// Получаем ссылку на элемент приложения
const app = document.querySelector('.app');

// Функция обработки маршрута редактирования
const handleEditPageRoute = async (id) => {
  isMainPage = false;
  app.textContent = '';

  // Создаем раздел и форму редактирования
  const { sectionEditWish, formWish } = await createEditWish(id);
  renderNavigation('profile', formWish);
  app.append(sectionEditWish);
};

const handleEditProfileRoute = async (login) => {
  isMainPage = false;
  app.textContent = '';

  const { sectionEditProfile, formProfile } = await createEditProfile(login);
  renderNavigation('profile', formProfile);
  app.append(sectionEditProfile);
};

// Функция обработки маршрута пользователя
const handleUserRoute = async (login) => {
  isMainPage = false; // Устанавливаем флаг, что мы не на главной странице
  app.textContent = '';
  renderNavigation();
  // Добавляем в приложение раздел списка желаний пользователя
  app.append(await createWishlist(login));
};

// Функция обработки маршрута главной страницы
const handleHomePage = () => {
  isMainPage = false;
  app.textContent = '';
  renderNavigation();
  // Добавляем в приложение главный раздел
  app.append(createHero());
};

// Функция инициализации приложения
const init = () => {
  router.on('/', handleHomePage);
  router.on('/editwish/:id', handleEditPageRoute);
  router.on('/editprofile/:login', handleEditProfileRoute);
  router.on('/user/:login', handleUserRoute);

  router.init();

  // Если не на главной странице, перенаправляем на соответствующий маршрут
  if (isMainPage) {
    if (auth.login) {
      router.setRoute(`/user/${auth.login}`);
    } else {
      router.setRoute('/');
    }
  }
};

init();
