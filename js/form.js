const noticeForm = document.querySelector('.ad-form');//Форма объявления
const noticeFormElements = noticeForm.children;//дети Формы объявления
const mapFilterForm = document.querySelector('.map__filters');//форма фильтрация объявлений
const mapFilterFormElements = mapFilterForm.children;//дети формы фильтрация объявлений

//функция отключения форм
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

//функция включения форм
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
