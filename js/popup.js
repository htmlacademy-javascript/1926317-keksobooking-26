
const template = document.querySelector('#card').content.querySelector('.popup');
const typeOfHousingCollection = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const creatPopup = (data) => {
  const card = template.cloneNode(true);
  const featuresRandom = data.offer.features;
  const popupFeatures = card.querySelector('.popup__features');
  const popupFeature = popupFeatures.querySelectorAll('.popup__feature');
  const photosRandom = data.offer.photos;
  const photos = card.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');
  if (!photosRandom) {
    photo.remove();
  }
  else {
    photo.remove();
    photosRandom.forEach((picture) => {
      const photoClone = photo.cloneNode();
      photoClone.src = picture;
      photoClone.width = 45;
      photoClone.height = 40;
      photoClone.alt = 'Фотография жилья';
      photos.appendChild(photoClone);
    });
  }
  if (!featuresRandom) {
    popupFeatures.remove();
  } else {
    popupFeature.forEach((popupFeatureItem)=>{
      const isReal = featuresRandom.some((feature)=> popupFeatureItem.classList.contains(`popup__feature--${feature}`));
      if (!isReal){
        popupFeatureItem.remove();
      }
      if(!featuresRandom.length){
        popupFeatures.classList.add('hidden');
      }
    });
  }
  card.querySelector('.popup__title').textContent = data.offer.title;
  card.querySelector('.popup__text--address').textContent = data.offer.address;
  card.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = typeOfHousingCollection[data.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  card.querySelector('.popup__description').textContent = data.offer.description;
  card.querySelector('.popup__avatar').src = data.author.avatar;
  return card;
};

export {creatPopup};
