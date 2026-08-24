import {
  COMMENTATOR_NAMES,
  COMMENTS,
  PHOTO_DESCRIPTIONS,
  PHOTOS_COUNT,
  MIN_LIKES,
  MAX_LIKES,
  MIN_COMMENTS,
  MAX_COMMENTS,
  MIN_AVATAR_NUMBER,
  AVATARS_COUNT,
  AVATAR_PATH,
} from './data.js';

import {
  getRandomInteger,
  createIdGenerator,
  getRandomArrayElement,
} from './utils.js';
// генераторы уникальных идентификаторов фотографий и комментариев
const getCommentId = createIdGenerator();
const getPhotoId = createIdGenerator();
const getRandomDescription = () => getRandomArrayElement(PHOTO_DESCRIPTIONS);
const getRandomCommentMessage = () => {
  const firstMessage = getRandomArrayElement(COMMENTS);

  if (getRandomInteger(1, 2) === 1) {
    return firstMessage;
  }

  let secondMessage = getRandomArrayElement(COMMENTS);

  while (secondMessage === firstMessage) {
    secondMessage = getRandomArrayElement(COMMENTS);
  }

  return `${firstMessage} ${secondMessage}`;
};
const getComment = () => (
  {
    id: getCommentId(),
    avatar: `${AVATAR_PATH}${getRandomInteger(MIN_AVATAR_NUMBER, AVATARS_COUNT)}.svg`,
    message: getRandomCommentMessage(),
    name: getRandomArrayElement(COMMENTATOR_NAMES),
  }
);


const createPhoto = () => {
  const id = getPhotoId();

  const url = `photos/${id}.jpg`;
  const description = getRandomDescription();
  const likes = getRandomInteger(MIN_LIKES, MAX_LIKES);
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = Array.from({ length: commentsCount }, () => getComment());
  return {
    id,
    url,
    description,
    likes,
    comments
  };
};

export const createPhotos = () =>
  Array.from({ length: PHOTOS_COUNT }, () => createPhoto());
