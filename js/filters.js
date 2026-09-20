import {getRandomInteger} from './utils.js';

const RANDOM_PICTURES_COUNT = 10;
const filtersElement = document.querySelector('.img-filters');
let activeButtonElement = filtersElement.querySelector('.img-filters__button--active');
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

const setActiveFilter = (buttonElement) => {
  activeButtonElement.classList.remove('img-filters__button--active');
  buttonElement.classList.add('img-filters__button--active');
  activeButtonElement = buttonElement;
};

const initializeFilters = (pictures, onFilterChange) => {
  const discussedButtonElement = filtersElement.querySelector('#filter-discussed');
  const defaultButtonElement = filtersElement.querySelector('#filter-default');
  const randomButtonElement = filtersElement.querySelector('#filter-random');
  discussedButtonElement.addEventListener('click', () => {
    setActiveFilter(discussedButtonElement);
    const discussedPictures = getDiscussedPictures(pictures);
    onFilterChange(discussedPictures);
  });
  defaultButtonElement.addEventListener('click', () => {
    setActiveFilter(defaultButtonElement);
    onFilterChange(pictures);
  });
  randomButtonElement.addEventListener('click', () => {
    setActiveFilter(randomButtonElement);
    onFilterChange(getRandomPictures(pictures));
  });
};
export {showFilters, initializeFilters};
