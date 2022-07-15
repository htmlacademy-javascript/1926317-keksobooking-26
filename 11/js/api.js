import {showAlert} from './util.js';
const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response)=>response.json())
    .then((data)=>{
      onSuccess(data);
    })
    .catch(()=>{
      showAlert('Что то пошло не так');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(()=>{
      onFail();
    });
};

export {getData, sendData};
