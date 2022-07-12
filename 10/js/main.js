import './popup.js';
import './form.js';
import './map.js';
import {renderCards} from './map.js';
import {setUserFormSubmit, getSuccessMessage} from './form.js';
import {getData} from './api.js';
const VALUE_OF_OBJECT = 10;
getData ((data)=>{
  renderCards(data.slice(0,VALUE_OF_OBJECT));
});


setUserFormSubmit(getSuccessMessage);
