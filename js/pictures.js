// Контейнер для миниатюр и шаблон одной фотографии.
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// onPictureClick — функция, которую нужно вызвать после клика по миниатюре.
const renderPictures = (pictures, onPictureClick) => {
  // Фрагмент позволяет добавить все миниатюры в DOM за один раз.
  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const {url, description, likes, comments} = picture;
    // Создаём копию шаблона и заполняем её данными фотографии.
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureImage = pictureElement.querySelector('.picture__img');

    pictureImage.src = url;
    pictureImage.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    // Каждая функция-обработчик запоминает свой объект picture благодаря замыканию.
    pictureElement.addEventListener('click', (evt) => {
      // Отменяем стандартный переход ссылки по адресу «#».
      evt.preventDefault();

      // Передаём в полноразмерное окно тот же объект, из которого создана миниатюра.
      onPictureClick(picture);
    });

    picturesFragment.append(pictureElement);
  });

  // Вставляем готовые миниатюры в контейнер на странице.
  picturesContainer.append(picturesFragment);
};

export {renderPictures};
