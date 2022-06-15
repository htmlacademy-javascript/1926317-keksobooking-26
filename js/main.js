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
// Переменные
const TITLE = ['Сдам дешево','В хорошие руки','Для молодожен','Отдыхайте весело'];
const PRICE = getRandomPositiveInteger(1000,50000);
const TYPE = ['palace','flat','house','bungalow','hotel'];
const ROOMS = getRandomPositiveInteger(1,5);
const GUESTS = getRandomPositiveInteger(0,10);
const CHECK_IN_OR_OUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DISCRIPTION = ['отличный вид', 'в центре города'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const NUMBER_OF_OBJECTS = 10;
//Создание объекта
const creatObject = function () {
  const ZERO_STRING = '0';
  const RANDOM_INDEX = getRandomPositiveInteger(1,10);
  const LOCATION ={
    lat:getRandomPositiveFloat(35.65, 35.7, 5),
    lng:getRandomPositiveFloat(139.7, 139.8, 5)
  };
  return {
    author:{
      avatar:`img/avatars/user${RANDOM_INDEX === 10 ? RANDOM_INDEX : ZERO_STRING + RANDOM_INDEX}.png`
    },
    offer:{
      title:getRandomArrayElement(TITLE),
      address:`${LOCATION.lat}, ${LOCATION.lng}`,
      price:PRICE,
      type:getRandomArrayElement(TYPE),
      rooms:ROOMS,
      guests:GUESTS,
      checkin:getRandomArrayElement(CHECK_IN_OR_OUT),
      checkout:getRandomArrayElement(CHECK_IN_OR_OUT),
      features:getRandomArrayLength(FEATURES),
      description:getRandomArrayElement(DISCRIPTION),
      photos:getRandomArrayLength(PHOTOS)
    },
    location:LOCATION,
  };
};
// Массив из объектов "creatObject"
const creatManyObjects = Array.from({length:NUMBER_OF_OBJECTS}, creatObject);
creatManyObjects();
