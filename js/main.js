import './popup.js';
import './form.js';
import './map.js';
import {renderCards, clearMarkers, loadMap} from './map.js';
import {setUserFormSubmit, getSuccessMessage, activateForm} from './form.js';
import {getData} from './api.js';
import {toFilteredMap} from './filter.js';
import {debounce} from './util.js';
import {loadMedia} from './avatar.js';
const mapFilters = document.querySelector('.map__filters');
const RERENDER_DELAY = 500;
const VALUE_OF_OBJECT = 10;
activateForm(false);

getData ((data)=> {
  renderCards(data.slice(0,VALUE_OF_OBJECT));
  loadMap (activateForm);
  mapFilters.addEventListener('change', debounce(()=>{
    clearMarkers();
    renderCards(data.slice().filter(toFilteredMap).slice(0,VALUE_OF_OBJECT));
  }, RERENDER_DELAY));
});

setUserFormSubmit(getSuccessMessage);
loadMedia();

