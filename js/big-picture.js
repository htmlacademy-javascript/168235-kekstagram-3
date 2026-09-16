// Находим полноразмерное окно и все элементы, данные которых будут меняться.
const COMMENTS_PER_PORTION = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const shownCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
let currentComments = [];
let renderedCommentsCount = 0;

// Создаём DOM-элемент одного комментария из переданного объекта.
const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  const picture = document.createElement('img');
  const text = document.createElement('p');

  comment.classList.add('social__comment');

  picture.classList.add('social__picture');
  picture.src = avatar;
  picture.alt = name;
  picture.width = 35;
  picture.height = 35;

  text.classList.add('social__text');
  // textContent вставляет сообщение как текст и не интерпретирует его как HTML.
  text.textContent = message;

  // Собираем готовую структуру <li>: сначала аватар, затем текст комментария.
  comment.append(picture, text);

  return comment;
};

// Создаём список комментариев выбранной фотографии.
const renderComments = (comments) => {
  // Фрагмент позволяет подготовить все комментарии до вставки в DOM.
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });

  commentsList.append(commentsFragment);
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_PER_PORTION);
  renderComments(nextComments);
  renderedCommentsCount += nextComments.length;
  shownCommentsCount.textContent = renderedCommentsCount;
  commentsLoader.classList.toggle(
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
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Обработчик клавиатуры нужен только пока полноразмерное окно открыто.
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Заполняем и показываем окно данными выбранной фотографии.
const openBigPicture = ({url, description, likes, comments}) => {
  currentComments = comments;
  renderedCommentsCount = 0;
  // Сначала заменяем всё содержимое, чтобы пользователь не увидел старые данные.
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  totalCommentsCount.textContent = comments.length;
  caption.textContent = description;
  commentsList.replaceChildren();
  renderNextComments();
  commentsCount.classList.remove('hidden');

  // Показываем окно, запрещаем прокрутку фона и включаем закрытие по Escape.
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

commentsLoader.addEventListener('click', renderNextComments);
// Кнопка существует всё время жизни страницы, поэтому обработчик ставится один раз.
closeButton.addEventListener('click', closeBigPicture);

export {openBigPicture};
