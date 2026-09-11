
// функция для получения случайного целого числа из диапазона включительно
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
// функция для создания уникального идентификатора
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};
// функция для получения случайного элемента массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];
//Функция показа сообщения ошибки загрузки фото с сервера
const showDataError = () => {
  const errorTemplate = document.querySelector('#data-error');
  const errorFragment = errorTemplate.content.cloneNode(true);
  const errorElement = errorFragment.querySelector('.data-error');
  document.body.append(errorFragment);
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};
// Функция показа сообщения при успешной отправки формы
const showSuccess = () => {
  const successTemplate = document.querySelector('#success').content;
  const successFragment = successTemplate.cloneNode(true);
  const successElement = successFragment.querySelector('.success');
  const successButton = successElement.querySelector('.success__button');
  function closeSuccess() {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessKeydown);
  }
  successButton.addEventListener('click', () => {
    closeSuccess();
  });
  function onSuccessKeydown(evt) {
    if(evt.key === 'Escape') {
      closeSuccess();
    }
  }
  document.addEventListener('keydown', onSuccessKeydown);
  successElement.addEventListener('click', (evt) => {
    if(evt.target === successElement) {
      closeSuccess();
    }
  });
  document.body.append(successFragment);
};
// Функция показа сообщения при ошибке отправки формы
const showError = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorFragment = errorTemplate.cloneNode(true);
  const errorElement = errorFragment.querySelector('.error');
  const errorButton = errorFragment.querySelector('.error__button');
  function closeError() {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorKeydown, true);
  }
  errorButton.addEventListener('click', () => {
    closeError();
  });
  function onErrorKeydown(evt) {
    if(evt.key === 'Escape') {
      evt.stopImmediatePropagation();
      closeError();
    }
  }
  document.addEventListener('keydown', onErrorKeydown, true);
  errorElement.addEventListener('click', (evt) => {
    if(evt.target === errorElement) {
      closeError();
    }
  });
  document.body.append(errorFragment);
};

export {getRandomArrayElement, showDataError, getRandomInteger, createIdGenerator, showSuccess, showError};
