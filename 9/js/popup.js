
const template = document.querySelector('#card').content.querySelector('.popup');
const typeOfHousingCollection = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};


const creatPopup = (arrayOfObjects) =>{
  const card = template.cloneNode(true);
  const featuresRandom = arrayOfObjects.offer.features;
  const popupFeatures = card.querySelector('.popup__features');
  const popupFeature = popupFeatures.querySelectorAll('.popup__feature');
  const photosRandom = arrayOfObjects.offer.photos;
  const photos = card.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');
  photosRandom.forEach((picture) => {
    const photoClone = photo.cloneNode(true);
    photoClone.src = picture;
    photos.appendChild(photoClone);
  });
  photo.remove('popup__photo');
  if (!photosRandom.length){photos.classList.add('hidden');}
  popupFeature.forEach((popupFeatureItem)=>{
    const isReal = featuresRandom.some((feature)=> popupFeatureItem.classList.contains(`popup__feature--${feature}`));
    if (!isReal){
      popupFeatureItem.remove();
    }
    if(!featuresRandom.length){popupFeatures.classList.add('hidden');}
  });
  card.querySelector('.popup__title').textContent = arrayOfObjects.offer.title;
  card.querySelector('.popup__text--address').textContent = arrayOfObjects.offer.address;
  card.querySelector('.popup__text--price').textContent = `${arrayOfObjects.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = typeOfHousingCollection[arrayOfObjects.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${arrayOfObjects.offer.rooms} комнаты для ${arrayOfObjects.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${arrayOfObjects.offer.checkin}, выезд до ${arrayOfObjects.offer.checkout}`;
  card.querySelector('.popup__description').textContent = arrayOfObjects.offer.description;
  card.querySelector('.popup__avatar').src = arrayOfObjects.author.avatar;
  return card;
};

export {creatPopup};
