import { tagMain, onEscapePress } from './form.js';

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

const showFailMessage = () => {
  const failMessage = document.querySelector('#error').content.querySelector('.error');
  const failMessageElement = failMessage.cloneNode(true);
  failMessageElement.classList.add('fail__element');
  tagMain.appendChild(failMessageElement);
  const failElement = document.querySelector('.fail__element');
  const errorButton = failElement.querySelector('.error__button');
  errorButton.classList.add('hidden');
  const failTitle = failElement.querySelector('.error__title');
  failTitle.textContent = 'не удалось загрузить фото :(';
  failTitle.style.color = '#dc143c';
  const failMessageRemoveHandler = ()  =>  {
    failElement.remove();
  };

  document.addEventListener('click', failMessageRemoveHandler);
  onEscapePress(failMessageRemoveHandler, failMessageRemoveHandler);
};

export { sendData, getData, showFailMessage }
