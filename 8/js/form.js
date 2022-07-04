const noticeForm = document.querySelector('.ad-form');//Форма объявления
const noticeFormElements = noticeForm.children;//дети Формы объявления
const mapFilterForm = document.querySelector('.map__filters');//форма фильтрация объявлений
const mapFilterFormElements = mapFilterForm.children;//дети формы фильтрация объявлений
const price = noticeForm.querySelector('#price');
const typeOfHousing = document.querySelector('#type');
const typeOfHousingPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};
const maxPrice = {
  palace: 100000,
  flat: 100000,
  house: 100000,
  bungalow: 100000,
  hotel: 100000
};
const roomNumber = noticeForm.querySelector('#room_number');
const capacityGuests = noticeForm.querySelector('#capacity');
const possibleCapacity = {
  1:['1'],
  2:['1', '2'],
  3:['1', '2', '3'],
  100:['0']
};
const words = {
  1: {
    room: 'комната',
    guest: 'для 1 гостя'
  },
  2: {
    room: 'комнаты',
    guest: 'для 1 или 2 гостей'
  },
  100: {
    room: 'комнат',
    guest: 'не для гостей'
  },
};
const timeIn = noticeForm.querySelector('#timein');
const timeOut = noticeForm.querySelector('#timeout');
//валидатор пристинЭ
const pristine = new Pristine(noticeForm, {
  classTo:'ad-form__element',
  errorTextParent:'ad-form__element',
  errorTextClass:'ad-form__error-text',
});

//проверка валидности "Заголовок объявления"
function validateTitleNotice (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(noticeForm.querySelector('#title'),validateTitleNotice);

//проверка валидности "Тип жилья and Цена за ночь, руб."

typeOfHousing.addEventListener('change', () => {
  price.placeholder = typeOfHousingPrice[typeOfHousing.value];
  price.min = typeOfHousingPrice[typeOfHousing.value];
  price.value = '';
});

function validatePrice (value) {
  return value <= maxPrice[typeOfHousing.value] && value>=typeOfHousingPrice[typeOfHousing.value];
}
function getPriceErrorMessage (){
  return `не менее ${typeOfHousingPrice[typeOfHousing.value]} и не более ${maxPrice[typeOfHousing.value]}`;
}
pristine.addValidator(price, validatePrice, getPriceErrorMessage);

//проверка валидности "Количество комнат и количество мест"

function validateCapacity () {
  return possibleCapacity[roomNumber.value].includes(capacityGuests.value);
}

function getCapacityErrorMessage () {
  return `${roomNumber.value} ${words[roomNumber.value].room} ${words[roomNumber.value].guest}`;
}

pristine.addValidator(roomNumber, validateCapacity);
pristine.addValidator(capacityGuests, validateCapacity, getCapacityErrorMessage);

// Время заезда/выезда
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
  pristine.validate();
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
  pristine.validate();
});

function validateTime () {
  return  timeIn.value === timeOut.value;
}

pristine.addValidator(timeOut, validateTime);

noticeForm.addEventListener('submit', (evt) => {
  if (!pristine.validate())
  {evt.preventDefault();}
});

//функция отключения формы
const toDisableForm = function () {
  noticeForm.classList.add('ad-form--disabled');
  for (const element of noticeFormElements) {
    element.disabled = true;
  }
  mapFilterForm.classList.add('map__filters--disabled');
  for (const element of mapFilterFormElements){
    element.disabled = true;
  }
};
toDisableForm();

//функция включения формы
const toAbleForm = function() {
  noticeForm.classList.remove('ad-form--disabled');
  for (const element of noticeFormElements) {
    element.disabled = false;
  }
  mapFilterForm.classList.remove('map__filters--disabled');
  for (const element of mapFilterFormElements){
    element.disabled = false;
  }
};
toAbleForm();
