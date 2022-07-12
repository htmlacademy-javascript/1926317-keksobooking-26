import {toAbleForm} from './form.js';//импортирую функцию активации формы
import {creatPopup} from './popup.js';
const resetButton = document.querySelector('.ad-form__reset');
const tokioLatDefault = 35.6895;//Координаты Токио
const tokioLngDefault = 139.692;//Координаты Токио
const scaleGlobal = 10;
const scaleLocal = 18;
//настройки карты
const map = L.map('map-canvas')
  .on('load', () => {//обработчик активации формы
    toAbleForm();
  })
  .setView({
    lat: tokioLatDefault,
    lng: tokioLngDefault,
  }, scaleGlobal);

const tiles = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

//стилизация маркеров
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

//основной маркера
const mainMarker = L.marker(
  {
    lat: tokioLatDefault,
    lng: tokioLngDefault,
  },
  {
    draggable: true,//разрешение на перемещение маркера
    icon: mainPinIcon,//подключение стилизованного маркера
  },
);

tiles.addTo(map);//добавление каких то тайлов
mainMarker.addTo(map);//добавление маркера
mainMarker.on('moveend', (evt) => {//обработчик по перемещению (запомниает ширину и долготу)
  const afterPoint = 4;
  const lat = evt.target.getLatLng().lat.toFixed(afterPoint);
  const lng = evt.target.getLatLng().lng.toFixed(afterPoint);
  document.querySelector('#address').value = `LatLng(${lat}, ${lng})`;
});

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({//возвращаю маркер на исходную по клику на "Очистить"
    lat: tokioLatDefault,
    lng: tokioLngDefault,
  });
  map.setView({
    lat: tokioLatDefault,
    lng: tokioLngDefault,
  }, scaleLocal);
});

//Много маркеров
const markerGroup = L.layerGroup().addTo(map);

const createMarker = (element)=>{
  const marker = L.marker({
    lat:element.location.lat,
    lng:element.location.lng
  },
  {
    icon: pinIcon,
  });

  marker
    .addTo(markerGroup)
    .bindPopup(creatPopup(element));//эта штука делает попап(балун) на маркере
};

const renderCards = (elements) => {
  elements.forEach((element) => {
    createMarker(element);
  });
};

export {renderCards};
// markerGroup.clearLayers();//очищает слой маркеров
