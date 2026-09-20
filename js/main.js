import {getData} from './api.js';
import {renderPictures} from './pictures.js';
import {openBigPicture} from './big-picture.js';
import './form.js';
import {showDataError, debounce} from './utils.js';
import {showFilters, initializeFilters} from './filters.js';
const onPhotosLoad = (photos) => {
  renderPictures(photos, openBigPicture);
  showFilters();
  const renderFilteredPictures = debounce((filteredPictures) => {
    renderPictures(filteredPictures, openBigPicture);
  });

  initializeFilters(photos, renderFilteredPictures);
};
getData(onPhotosLoad, showDataError);
