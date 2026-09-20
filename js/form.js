import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {showSuccess, showError} from './utils.js';
const DEFAULT_IMAGE_URL = 'img/upload-default-image.jpg';
const FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
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
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const uploadSubmitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const uploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectPreviewElements = uploadFormElement.querySelectorAll('.effects__preview');
let imageUrl = null;
// Переменная для хранения ID текущей активной формы
let currentUploadSessionId = 0;
// Подключаем библиотеку Pristine для валидации формы. Она уже подключена в index.html, поэтому здесь мы просто создаём экземпляр.
const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

//преобразование строки в массив
const getHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter((tag) => tag !== '');

// функция для проверки валидности хэштегов
const validateHashtags = (value) => {
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
const descriptionInputElement = uploadFormElement.querySelector('.text__description');
// константы для валидации формы
const isDescriptionValid = (description) => description.length <= MAX_DESCRIPTION_LENGTH;

// проверка валидности описания
pristine.addValidator(
  descriptionInputElement,
  isDescriptionValid,
  ERROR_DESCRIPTION_LENGTH
);

// проверка валидности хэштегов
pristine.addValidator(
  hashtagsInputElement,
  validateHashtags,
  ERROR_INVALID_HASHTAG
);

// проверка количества хэштегов
pristine.addValidator(
  hashtagsInputElement,
  isHashtagsCountValid,
  ERROR_HASHTAGS_COUNT
);

// проверка уникальности хэштегов
pristine.addValidator(
  hashtagsInputElement,
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
  uploadSubmitButtonElement.disabled = false;
  currentUploadSessionId += 1;
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFormElement.reset();
  resetScale();
  resetEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
  // Очистить ошибки валидации и сбросить классы CSS
  pristine.reset();
  uploadPreviewElement.src = DEFAULT_IMAGE_URL;
  effectPreviewElements.forEach((effectPreviewElement) => {
    effectPreviewElement.style.backgroundImage = '';
  });
  if (imageUrl) {
    URL.revokeObjectURL(imageUrl);
    imageUrl = null;
  }
}

// функция открытия формы загрузки изображения
const onUploadFileChange = () => {
  const file = uploadFileInputElement.files[0];
  if (!file) {
    return;
  }
  const fileName = file.name.toLowerCase();
  const matches = FILE_EXTENSIONS.some((extension) => fileName.endsWith(extension));
  if (!matches) {
    uploadFileInputElement.value = '';
    showError();
    return;
  }
  currentUploadSessionId += 1;
  imageUrl = URL.createObjectURL(file);
  uploadPreviewElement.src = imageUrl;
  effectPreviewElements.forEach((effectPreviewElement) => {
    effectPreviewElement.style.backgroundImage = `url("${imageUrl}")`;
  });
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
const onUploadCancelClick = () => {
  closeUploadForm();
};
// обработчики событий
uploadFileInputElement.addEventListener('change', onUploadFileChange);
// закрытие формы по кнопке "Отмена"
uploadCancelButtonElement.addEventListener('click', onUploadCancelClick);

// функция отмены всплытия события при нажатии клавиши Escape в текстовых полях
const onInputEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

// обработчик текстооыйх полей, чтобы при фокусе на них не закрывалась форма по Escape
hashtagsInputElement.addEventListener('keydown', onInputEscapeKeydown);
descriptionInputElement.addEventListener('keydown', onInputEscapeKeydown);

// обработчик события отправки формы
uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  const formData = new FormData(uploadFormElement);
  uploadSubmitButtonElement.disabled = true;
  const uploadSessionId = currentUploadSessionId;
  sendData(formData)
    .then(() => {
      if (uploadSessionId !== currentUploadSessionId) {
        return;
      }
      closeUploadForm();
      showSuccess();
    })
    .catch(() => {
      if (uploadSessionId !== currentUploadSessionId) {
        return;
      }
      showError();
    }
    )
    .finally(() => {
      if (uploadSessionId !== currentUploadSessionId) {
        return;
      }
      uploadSubmitButtonElement.disabled = false;
    });
});
