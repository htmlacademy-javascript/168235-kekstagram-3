import {getRandomInteger} from './utils.js';

const RANDOM_PICTURES_COUNT = 10;
const filtersElement = document.querySelector('.img-filters');

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};
const getDiscussedPictures = (pictures) => [...pictures].sort((firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length);

const getRandomPictures = (pictures) => {
  const availablePictures = [...pictures];
  const randomPictures = [];
  while (
    randomPictures.length < RANDOM_PICTURES_COUNT &&
    availablePictures.length > 0
  ) {
    const randomIndex = getRandomInteger(0, availablePictures.length - 1);
    const selectedPicture = availablePictures.splice(randomIndex, 1)[0];
    randomPictures.push(selectedPicture);
  }

  return randomPictures;
};

const setActiveFilter = (button) => {
  const activeButton = filtersElement.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const initFilters = (pictures, onFilterChange) => {
  const discussedButton = filtersElement.querySelector('#filter-discussed');
  const defaultButton = filtersElement.querySelector('#filter-default');
  const randomButton = filtersElement.querySelector('#filter-random');
  discussedButton.addEventListener('click', () => {
    setActiveFilter(discussedButton);
    const discussedPictures = getDiscussedPictures(pictures);
    onFilterChange(discussedPictures);
  });
  defaultButton.addEventListener('click', () => {
    setActiveFilter(defaultButton);
    onFilterChange(pictures);
  });
  randomButton.addEventListener('click', () => {
    setActiveFilter(randomButton);
    onFilterChange(getRandomPictures(pictures));
  });
};
export {showFilters, initFilters};
