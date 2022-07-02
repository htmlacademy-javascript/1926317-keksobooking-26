const noticeForm = document.querySelector('.ad-form');//Форма объявления
const noticeFormElements = noticeForm.children;//дети Формы объявления
const mapFilterForm = document.querySelector('.map__filters');//форма фильтрация объявлений
const mapFilterFormElements = mapFilterForm.children;//дети формы фильтрация объявлений
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

pristine.addValidator(noticeForm.querySelector('#title'),validateTitleNotice,'Объявление от 30 до 100 символов');

//проверка валидности "Тип жилья and Цена за ночь, руб."
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
const roomNumber = noticeForm.querySelector('#room_number');
const capacityGuests = noticeForm.querySelector('#capacity');
const possibleCapacity = {
  '1':['1'],
  '2':['1', '2'],
  '3':['1', '2', '3'],
  '100':['0']
};

function validateCapacity () {
  return possibleCapacity[roomNumber.value].includes(capacityGuests.value);
}

function getCapacityErrorMessage () {
  if (roomNumber.value==='1'){
    return `${roomNumber.value} команта для 1 гостя`;
  }
  if (roomNumber.value==='2'){
    return `${roomNumber.value} команты для 1 или 2 гостей`;
  }
  if (roomNumber.value==='3'){
    return `${roomNumber.value} команты от 1 до 3 гостей`;
  }
  if (roomNumber.value==='100'){
    return `${roomNumber.value} комант не для гостей`;
  }
}

pristine.addValidator(roomNumber, validateCapacity);
pristine.addValidator(capacityGuests, validateCapacity, getCapacityErrorMessage);


noticeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
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
