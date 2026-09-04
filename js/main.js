import {createPhotos} from './create-data.js';
import {renderPictures} from './pictures.js';
import {openBigPicture} from './big-picture.js';

// Создаём один общий массив данных для миниатюр и полноразмерного окна.
const photos = createPhotos();

// Передаём openBigPicture без круглых скобок: это callback, который модуль
// миниатюр вызовет позже и передаст ему объект выбранной фотографии.
renderPictures(photos, openBigPicture);
