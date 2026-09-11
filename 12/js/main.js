import {getData} from './api.js';
import {renderPictures} from './pictures.js';
import {openBigPicture} from './big-picture.js';
import './form.js';
import { showDataError} from './utils.js';
const onPhotosLoad = (photos) => {
  renderPictures(photos, openBigPicture);
};
getData(onPhotosLoad, showDataError);
