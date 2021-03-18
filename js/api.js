import { tagMain } from './form.js';

const getData = (onSuccess, onError) => {
  return fetch('https://22.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onError(err);
    });

};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
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
    .catch(() => {
      onFail();
    });
}

let toShowFailMessage = () => {
  let failMessage = document.querySelector('#error').content.querySelector('.error');
  let failMessageElement = failMessage.cloneNode(true);
  failMessageElement.classList.add('fail__element');
  tagMain.appendChild(failMessageElement);
  let failElement = document.querySelector('.fail__element');
  let errorButton = failElement.querySelector('.error__button');
  errorButton.classList.add('hidden');
  let failTitle = failElement.querySelector('.error__title');
  failTitle.textContent = 'не удалось загрузить фото :(';
  failTitle.style.color = '#dc143c';
  let removeFailMessage = function () {
    failElement.remove();
  };

  document.addEventListener('click', removeFailMessage);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();
      removeFailMessage();
      document.removeEventListener('click', removeFailMessage);
    }
  });
};

export { sendData, getData, toShowFailMessage }
