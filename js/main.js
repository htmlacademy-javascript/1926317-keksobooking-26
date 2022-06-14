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
  const lengthArray = getRandomPositiveInteger(0,array.length);
  const newArray = [];
  for (let i = 0; i < lengthArray; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};
// Переменные
const TITLE = ['Сдам дешево','В хорошие руки','Для молодожен','Отдыхайте весело'];
const PRICE = [1000,2000,5000,7772];
const TYPE = ['palace','flat','house','bungalow','hotel'];
const ROOMS = [1,2,3,4];
const GUESTS = [1,2,3];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DISCRIPTION = ['отличный вид', 'в центре города'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

//Создание объекта
const creatObject = function () {
  return {
    author:{
      avatar:''
    },
    offer:{
      title:getRandomArrayElement(TITLE),
      address:'',
      price:getRandomArrayElement(PRICE),
      type:getRandomArrayElement(TYPE),
      rooms:getRandomArrayElement(ROOMS),
      guests:getRandomArrayElement(GUESTS),
      checkin:getRandomArrayElement(CHECKIN),
      checkout:getRandomArrayElement(CHECKOUT),
      features:getRandomArrayLength(FEATURES),
      description:getRandomArrayElement(DISCRIPTION),
      photos:getRandomArrayLength(PHOTOS)
    },
    location:{
      lat:getRandomPositiveFloat(35.65000,35.70000,5),
      lng:getRandomPositiveFloat(139.70000,139.80000,5)
    }
  };
};

creatObject();
