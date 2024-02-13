export const createElement = (tagName, attribute) => {
  const elem = document.createElement(tagName);
  Object.assign(elem, attribute);
  return elem;
};

// Отображение возраста пользователя в правильном падеже
export const pluralizeYears = (age) => {

  let years = age % 100;

  // Определение правила склонения в зависимости от последней цифры
  if (years >= 11 && years <= 19) {
    return 'лет';
  } else {
    let lastDigit = years % 10;
    if (lastDigit === 1) {
      return 'год';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return 'года';
    } else {
      return 'лет';
    }
  }
};

// Обработка события выбора файла изображения
export const handleImageFileSelection = (inputFile, image, inputHidden) => {
  const handleFileInputChage = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]; // Получение выбранного файла
      const reader = new FileReader(); // Создание объекта для чтения файла
      reader.addEventListener('load', () => {
        image.src = reader.result; // Установка изображения
        if (inputHidden) {
          inputHidden.value = reader.result; // Сохранение данных в скрытый input
        }
      });

      reader.readAsDataURL(file); // Чтение файла как DataURL
    }
  };

  // Добавление обработчика к событию изменения input файла
  inputFile.addEventListener('change', handleFileInputChage);
};

// Создание элементов даты рождения
export const createSelectDate = (
  selectDay,
  selectMonth,
  selectYear,
  birhdate,
) => {
  // Создание дней рождения с 1 по 31
  for (let day = 0; day <= 31; day++) {
    const option = createElement('option', {
      value: day ? day : '',
      text: day ? day : '',
    });

    selectDay.append(option);
  }

  const months = [
    '',
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Отк',
    'Ноя',
    'Дек',
  ];

  // Создание месяцев
  for (let i = 0; i < months.length; i++) {
    const option = createElement('option', {
      value: i,
      text: months[i],
    });
    selectMonth.append(option);
  }

  // Получение текущего года
  const currentYear = new Date().getFullYear();

  const optionYear = document.createElement('option');
  optionYear.value = '';
  optionYear.text = '';
  selectYear.append(optionYear);

  // Создание опций для годов за последние 100 лет
  for (let year = currentYear; year >= currentYear - 100; year--) {
    const option = createElement('option', {
      value: year,
      text: year,
    });

    selectYear.append(option);
  }

  // Установка выбранной даты рождения, если она передана
  if (birhdate) {
    const [month, day, year] = birhdate.split('/');
    selectDay.value = day;
    selectMonth.value = month;
    selectYear.value = year;
  }

  // Снятие фокуса с элементов даты после изменения
  [selectDay, selectMonth, selectYear].forEach((dateSelect) => {
    dateSelect.addEventListener('change', ({ currentTarget }) => {
      currentTarget.blur();
    });
  });
};

// Вывод информации о валюте
export const createOptionsCurrency = (select, currency) => {
  console.log('currency: ', currency);
  // Массив доступных валют
  const currencies = ['RUB', 'USD', 'EUR', 'GBP'];

  // Создание валют
  for (let i = 0; i < currencies.length; i++) {
    const option = createElement('option', {
      value: currencies[i],
      text: currencies[i]
    });
    select.append(option);
  }

  // Установка выбранной валюты, если она передана
  select.value = currency ?? currencies[0];
};
