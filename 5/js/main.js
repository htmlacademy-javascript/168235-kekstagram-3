const COMMENTATOR_NAMES = [
  'Иван',
  'Алихан',
  'Айсултан',
  'Омар',
  'Виктор',
  'Юлия',
  'Алдияр',
  'Амир',
  'Александр',
  'Алексей',
  'Андрей',
  'Анастасия',
  'Алиса',
  'Алина',
  'Анна',
  'Владимир',
  'Владислав',
  'Дмитрий',
  'Евгений',
  'Екатерина',
  'Елена',
  'Альтаир',
  'Айбар',
  'Алинур',
  'Арлан',
];
// массив комментариев к фотографиям
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
// массив описаний фотографий
const PHOTO_DESCRIPTIONS = [
  'Пруд в парке',
  'Указатель на дороге',
  'Пляж на острове',
  'Девушка на берегу моря',
  'мясо с рисом',
  'Спортивная машина',
  'Клубника на тарелке',
  'Морс',
  'Самолёт над пляжем',
  'Обувь на полке',
  'дорога между деревьями',
  'Белая ауди на дороге',
  'Салат с овощами',
  'Кот над рисом в виде суши',
  'Теплая обувь надетая на ноги',
  'Самолёт в небе',
  'Оркестр на сцене',
  'Красная ретро машина в гараже',
  'Тапочки с фонариком',
  'Пальмы возле отеля',
  'Курица с овощами',
  'Закат на берегу моря',
  'Краб на бревне',
  'Концерт на сцене',
  'Белый внедорожник проезжающий мимо бегемота'
];
const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR_NUMBER = 1;
const AVATARS_COUNT = 6; // количество аватаров
const AVATAR_PATH = 'img/avatar-'; // путь к аватару
// функция для получения случайного целого числа из диапазона включительно
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
// функция для создания уникального идентификатора
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};
// функция для получения случайного элемента массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];
// генераторы уникальных идентификаторов для фотографий, комментариев и URL

const getCommentId = createIdGenerator();
const getPhotoId = createIdGenerator();
const generateDescription = () => getRandomArrayElement(PHOTO_DESCRIPTIONS);
const getRandomCommentMessage = () => {
  const firstComment = getRandomArrayElement(COMMENTS);

  if (getRandomInteger(1, 2) === 1) {
    return firstComment;
  }

  let secondComment = getRandomArrayElement(COMMENTS);

  while (secondComment === firstComment) {
    secondComment = getRandomArrayElement(COMMENTS);
  }

  return `${firstComment} ${secondComment}`;
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
  const description = generateDescription();
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

const createPhotos = () =>
  Array.from({ length: PHOTOS_COUNT }, () => createPhoto());

createPhotos();
