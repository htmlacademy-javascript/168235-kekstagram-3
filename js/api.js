
const API_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const API_URL_UPLOAD = 'https://32.javascript.htmlacademy.pro/kekstagram';

const getData = (onSuccess, onError) => fetch(API_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }
  )
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

const sendData = (body) => fetch(API_URL_UPLOAD, {
  method: 'POST',
  body,
})
  .then((response) => {
    if (response.ok) {
      return;
    }
    throw new Error(`${response.status} ${response.statusText}`);
  });
export {getData, sendData};
