const DATA_ERROR_TIMEOUT = 5000;
const DEBOUNCE_DELAY = 500;
// функция для получения случайного целого числа из диапазона включительно
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция показа сообщения ошибки загрузки фото с сервера
const showDataError = () => {
  const errorTemplate = document.querySelector('#data-error');
  const errorFragment = errorTemplate.content.cloneNode(true);
  const errorElement = errorFragment.querySelector('.data-error');
  document.body.append(errorFragment);
  setTimeout(() => {
    errorElement.remove();
  }, DATA_ERROR_TIMEOUT);
};

// Универсальная функция для показа всплывающих сообщений
const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content;
  const fragment = template.cloneNode(true);
  const element = fragment.querySelector(`.${type}`);
  const button = element.querySelector(`.${type}__button`);
  // Обработчик закрытия сообщения по Escape
  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      // stopImmediatePropagation нужен только для ошибки, чтобы не закрывались другие попапы
      if (type === 'error') {
        evt.stopImmediatePropagation();
      }
      closeMessage();
    }
  };
  // Удаляем сообщение и снимаем обработчик keydown с document
  function closeMessage() {
    element.remove();
    document.removeEventListener('keydown', onDocumentKeydown, type === 'error');
  }

  // Закрытие по кнопке
  const onMessageButtonClick = () => {
    closeMessage();
  };
  button.addEventListener('click', onMessageButtonClick);
  // Закрытие по клику на оверлей (вне самого окна)
  element.addEventListener('click', (evt) => {
    if (evt.target === element) {
      closeMessage();
    }
  });
  // Перехват нажатия Escape (для ошибки используем фазу погружения `true`)
  document.addEventListener('keydown', onDocumentKeydown, type === 'error');

  document.body.append(fragment);
};

const showSuccess = () => showMessage('success');
const showError = () => showMessage('error');

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showDataError, getRandomInteger, showSuccess, showError, debounce};
