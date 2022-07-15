import {sendData} from './api.js';
const noticeForm = document.querySelector('.ad-form');//Форма объявления
const noticeFormElements = noticeForm.children;//дети Формы объявления
const mapFilterForm = document.querySelector('.map__filters');//форма фильтрация объявлений
const mapFilterFormElements = mapFilterForm.children;//дети формы фильтрация объявлений
const price = noticeForm.querySelector('#price');
const typeOfHousing = document.querySelector('#type');
const priceSlider = document.querySelector('.ad-form__slider');
const onButtonSubmit = noticeForm.querySelector('.ad-form__submit');
const success = document.querySelector('#success')
  .content.querySelector('.success');
const error = document.querySelector('#error')
  .content.querySelector('.error');
const buttonError = error.querySelector('.error__button');
const body = document.querySelector('body');
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
  const minValue = 30;
  const maxValue = 100;
  return value.length >= minValue && value.length <= maxValue;
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

// функция включения формы
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

//слайдер
noUiSlider.create(priceSlider, {
  range: {
    min:Number(price.min),
    max:Number(price.max),
  },
  start:Number(price.placeholder),
  step:10,
  connect:'upper',
});
priceSlider.noUiSlider.on('slide', () => {
  price.value = Number(priceSlider.noUiSlider.get());
  pristine.validate();
});
price.addEventListener('change', (evt) => {
  priceSlider.noUiSlider.set(Number(evt.target.value));
});

//функция об успешной отправке
const getSuccessMessage = () => {
  const successMessage = success.cloneNode(true);
  body.appendChild(successMessage);
  document.addEventListener('click', () => {
    successMessage.remove();
  });
  document.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
    }
  });
  noticeForm.reset();
  onButtonSubmit.disabled = false;
};
//функция об НЕуспешной отправке
const getErrorMessage = () => {
  const errorMessage = error.cloneNode(true);
  body.appendChild(errorMessage);
  document.addEventListener('click', () => {
    errorMessage.remove();
  });
  document.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
    }
  });
  buttonError.querySelector('click', () => {
    errorMessage.remove();
  });
  onButtonSubmit.disabled = false;
};

const setUserFormSubmit = (onSuccess) => {
  noticeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      onButtonSubmit.disabled = true;
      sendData(() => onSuccess(),getErrorMessage,new FormData(evt.target),);
    }
  });
};
export {toAbleForm, setUserFormSubmit, getSuccessMessage};