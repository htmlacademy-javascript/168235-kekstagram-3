// Находим полноразмерное окно и все элементы, данные которых будут меняться.
const COMMENTS_PER_PORTION = 5;
const AVATAR_SIZE = 35;
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const shownCommentsCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
let currentComments = [];
let renderedCommentsCount = 0;

// Создаём DOM-элемент одного комментария из переданного объекта.
const createComment = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  const pictureElement = document.createElement('img');
  const textElement = document.createElement('p');

  commentElement.classList.add('social__comment');

  pictureElement.classList.add('social__picture');
  pictureElement.src = avatar;
  pictureElement.alt = name;
  pictureElement.width = AVATAR_SIZE;
  pictureElement.height = AVATAR_SIZE;

  textElement.classList.add('social__text');
  // textContent вставляет сообщение как текст и не интерпретирует его как HTML.
  textElement.textContent = message;

  // Собираем готовую структуру <li>: сначала аватар, затем текст комментария.
  commentElement.append(pictureElement, textElement);

  return commentElement;
};

// Создаём список комментариев выбранной фотографии.
const renderComments = (comments) => {
  // Фрагмент позволяет подготовить все комментарии до вставки в DOM.
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });

  commentsListElement.append(commentsFragment);
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_PER_PORTION);
  renderComments(nextComments);
  renderedCommentsCount += nextComments.length;
  shownCommentsCountElement.textContent = renderedCommentsCount;
  commentsLoaderElement.classList.toggle(
    'hidden',
    renderedCommentsCount >= currentComments.length
  );

};

// Закрываем окно только при нажатии клавиши Escape.
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  // Скрываем окно и снова разрешаем прокрутку основной страницы.
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Обработчик клавиатуры нужен только пока полноразмерное окно открыто.
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Заполняем и показываем окно данными выбранной фотографии.
const openBigPicture = ({url, description, likes, comments}) => {
  currentComments = comments;
  renderedCommentsCount = 0;
  // Сначала заменяем всё содержимое, чтобы пользователь не увидел старые данные.
  bigPictureImageElement.src = url;
  bigPictureImageElement.alt = description;
  likesCountElement.textContent = likes;
  totalCommentsCountElement.textContent = comments.length;
  captionElement.textContent = description;
  commentsListElement.replaceChildren();
  renderNextComments();
  commentsCountElement.classList.remove('hidden');

  // Показываем окно, запрещаем прокрутку фона и включаем закрытие по Escape.
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
const onCommentsLoaderClick = () => renderNextComments();
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
const onBigPictureCancelClick = () => closeBigPicture();
// Кнопка существует всё время жизни страницы, поэтому обработчик ставится один раз.
closeButtonElement.addEventListener('click', onBigPictureCancelClick);

export {openBigPicture};
