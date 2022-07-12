const ALERT_SHOW_TIME = 3000;
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

//Alert mankind, droids attack
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'pink';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArrayLength, showAlert};
