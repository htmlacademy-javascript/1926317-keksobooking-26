import {creatCards} from './popup.js';
const resetButton = document.querySelector('.ad-form__reset');
const map = L.map('map-canvas');
const LAT_DEFAULT = 35.68951;//Координаты Токио
const LNG_DEFAULT = 139.69201;//Координаты Токио
const SCALE_GLOBAL = 10;
const SCALE_LOCAL = 18;
//настройки карты
const loadMap = (form) => {
  map
    .on('load', () => {//обработчик активации формы
      form(true);
    })
    .setView({
      lat: LAT_DEFAULT,
      lng: LNG_DEFAULT,
    }, SCALE_GLOBAL);
};
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
    lat: LAT_DEFAULT,
    lng: LNG_DEFAULT,
  },
  {
    draggable: true,//разрешение на перемещение маркера
    icon: mainPinIcon,//подключение стилизованного маркера
  },
);

tiles.addTo(map);//добавление каких то тайлов
mainMarker.addTo(map);//добавление маркера
mainMarker.on('moveend', (evt) => {//обработчик по перемещению (запомниает ширину и долготу)
  const afterPoint = 5;
  const lat = evt.target.getLatLng().lat.toFixed(afterPoint);
  const lng = evt.target.getLatLng().lng.toFixed(afterPoint);
  document.querySelector('#address').value = `${lat}, ${lng}`;
});


resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({//возвращаю маркер на исходную по клику на "Очистить"
    lat: LAT_DEFAULT,
    lng: LNG_DEFAULT,
  });
  map.setView({
    lat: LAT_DEFAULT,
    lng: LNG_DEFAULT,
  }, SCALE_LOCAL);
  map.closePopup();
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
    .bindPopup(creatCards(element));//эта штука делает попап(балун) на маркере


};

const renderCards = (elements) => {
  elements.forEach((element) => {
    createMarker(element);
  });
};

const clearMarkers = () => {
  markerGroup.clearLayers();
};
export {renderCards, clearMarkers, loadMap};
