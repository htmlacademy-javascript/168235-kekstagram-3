// функция для получения случайного целого числа из диапазона включительно
export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
// функция для создания уникального идентификатора
export const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};
// функция для получения случайного элемента массива
export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];
