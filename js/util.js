// Функция, возвращающая случайное целое число из диапазона
const getRandomPositiveInteger = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция,возвращающая случайное число с плавающей точкой из диапазона
const getRandomPositiveFloat = function (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

// Функция,возвращающая случайный элемент массива
const getRandomArrayElement = function(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};
// Функция массива случайной длины
const getRandomArrayLength = function (array) {
  const lengthArray = getRandomPositiveInteger(0,array.length-1);
  return array.slice(0,lengthArray);
};
export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArrayLength};
