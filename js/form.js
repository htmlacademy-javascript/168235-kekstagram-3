import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {showSuccess, showError} from './utils.js';
// создаем регулярное выражение для проверки хэштегов
const HASHTAG_PATTERN = /^#[а-яёa-z0-9]{1,19}$/i;
// константы для валидации формы
const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
// константы ошибок валидации хэштегов
const ERROR_INVALID_HASHTAG = 'Введён невалидный хэштег';
const ERROR_HASHTAGS_COUNT = `Количество хэштегов не может превышать ${MAX_HASHTAGS_COUNT}`;
const ERROR_UNIQUE_HASHTAGS = 'Хэштеги не должны повторяться';
// константа ошибки валидации описания
const ERROR_DESCRIPTION_LENGTH = `Длина комментария не может составлять больше ${MAX_DESCRIPTION_LENGTH} символов`;
// Получаем элементы формы загрузки изображения
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const uploadSubmitButton = uploadForm.querySelector('.img-upload__submit');


// Подключаем библиотеку Pristine для валидации формы. Она уже подключена в index.html, поэтому здесь мы просто создаём экземпляр.
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

//преобразование строки в массив
const getHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter((tag) => tag !== '');

// функция для проверки валидности хэштегов
const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true; // пустая строка допустима;
  }
  const tags = getHashtags(value);
  return tags.every((tag) => HASHTAG_PATTERN.test(tag));
};

// функция проверки уникальности хэштегов
const areHashtagsUnique = (value) => {
  const tags = getHashtags(value);
  const uniqueTags = new Set(tags);
  return uniqueTags.size === tags.length;
};

// проверка на максимальное количество хэштегов
const isHashtagsCountValid = (value) => {
  const tags = getHashtags(value);
  return tags.length <= MAX_HASHTAGS_COUNT;
};
// поле описания
const descriptionInput = uploadForm.querySelector('.text__description');
// константы для валидации формы
const isDescriptionValid = (description) => description.length <= MAX_DESCRIPTION_LENGTH;

// проверка валидности описания
pristine.addValidator(
  descriptionInput,
  isDescriptionValid,
  ERROR_DESCRIPTION_LENGTH
);

// проверка валидности хэштегов
pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  ERROR_INVALID_HASHTAG
);

// проверка количества хэштегов
pristine.addValidator(
  hashtagsInput,
  isHashtagsCountValid,
  ERROR_HASHTAGS_COUNT
);

// проверка уникальности хэштегов
pristine.addValidator(
  hashtagsInput,
  areHashtagsUnique,
  ERROR_UNIQUE_HASHTAGS
);

// Закрываем окно только при нажатии клавиши Escape.
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadForm();
  }
};

// функция закрытия формы загрузки изображения
function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  resetScale();
  resetEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
  // Очистить ошибки валидации и сбросить классы CSS
  pristine.reset();

}

// функция открытия формы загрузки изображения
const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// обработчики событий
uploadFileInput.addEventListener('change', openUploadForm);
// закрытие формы по кнопке "Отмена"
uploadCancelButton.addEventListener('click', closeUploadForm);

// функция отмены всплытия события при нажатии клавиши Escape в текстовых полях
const onInputEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

// обработчик текстооыйх полей, чтобы при фокусе на них не закрывалась форма по Escape
hashtagsInput.addEventListener('keydown', onInputEscapeKeydown);
descriptionInput.addEventListener('keydown', onInputEscapeKeydown);

// обработчик события отправки формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  const formData = new FormData(uploadForm);
  uploadSubmitButton.disabled = true;
  sendData(formData)
    .then(() => {
      closeUploadForm();
      showSuccess();
    })
    .catch(
      showError
    )
    .finally(() => {
      uploadSubmitButton.disabled = false;
    });
});
