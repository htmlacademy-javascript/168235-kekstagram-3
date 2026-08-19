const checkLength = (string, maxLength) => string.length <= maxLength;
checkLength('Hello, world!', 20); // true
// Проверка на палиндром
const isPalindrome = (string) => {
  // Нормализация строки
  const normalized = string.replaceAll(' ', '').toLowerCase();
  // Создание пустой строки для перевернутого варианта
  let reversed = '';
  // Цикл от последнего индекса до 0
  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }
  // Сравнение строк
  return normalized === reversed;
};
isPalindrome('А роза упала на лапу Азора'); // true
// извлечение чисел из строки и возвращение целого числа
const extractDigits = (input) => {
  if (input === null || input === undefined) {
    return NaN;
  }
  // Превращаем число или любой другой тип в строку
  const str = String(input);
  // Ищем все цифры от 0 до 9
  const digits = str.match(/\d/g);
  // Если цифр нет, возвращаем NaN
  if (!digits) {
    return NaN;
  }
  // Соединяем цифры и преобразуем в целое положительное число
  const result = Number(digits.join(''));
  return result;
};
extractDigits('abc123def456'); // 123456

