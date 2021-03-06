import { pageBody } from './big-photo.js';
import { sendData } from './api.js';
import { scaleControlValue, imgUpload } from './photo-correction.js';

// let valueElement = document.querySelector('.effect-level__value');
let imgUploadInput = document.querySelector('#upload-file');
let imgUploadOverlay = document.querySelector('.img-upload__overlay');
let uploadCancel = document.querySelector('#upload-cancel');
let form = document.querySelector('.img-upload__form');
let tagMain = document.querySelector('main');
let commentField = document.querySelector('.text__description');
let hashtagField = document.querySelector('.text__hashtags');

// открытие-закрытие формы
const toClearForm = function () {
  imgUploadInput.value = '';
  hashtagField.value = '';
  commentField.value = '';
  // valueElement.value = 1;
  scaleControlValue.value = 100 + '%';
  imgUpload.style.transform = 'scale(1)';
  imgUpload.classList.add('effects__preview--none');
}

const toOpenForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
};

const toCloseForm = function () {
  toClearForm();
  imgUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscPress);
};

let onPopupEscPress = function (evt) {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
    toCloseForm();
  }
};

imgUploadInput.addEventListener('input', toOpenForm);
uploadCancel.addEventListener('click', toCloseForm);

// сообщение об успешной отправке

let uploadSuccess = function () {
  let successMessage = document.querySelector('#success').content.querySelector('.success');
  let successMessageElement = successMessage.cloneNode(true);
  successMessageElement.classList.add('success__element');
  tagMain.appendChild(successMessageElement);
  imgUploadOverlay.classList.add('hidden');
  toClearForm();
  let successElement = document.querySelector('.success__element');
  let successButton = successElement.querySelector('.success__button');
  let uploadFormSuccess = function () {
    successElement.remove();
  };
  successButton.addEventListener('click', uploadFormSuccess);
  document.addEventListener('click', uploadFormSuccess);
  document.addEventListener('keydown', function (evt) {
    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();
      successElement.remove();
      document.removeEventListener('click', uploadFormSuccess);
    }
  });
};

// сообщение о неуспешной отправке

let uploadError = function () {
  let errorMessage = document.querySelector('#error').content.querySelector('.error');
  let errorMessageElement = errorMessage.cloneNode(true);
  errorMessageElement.classList.add('error__element');
  tagMain.appendChild(errorMessageElement);
  imgUploadOverlay.classList.add('hidden');
  toClearForm();
  let errorElement = document.querySelector('.error__element');
  let errorButton = errorElement.querySelector('.error__button');
  let uploadFormError = function () {
    errorElement.remove();
  };
  errorButton.addEventListener('click', uploadFormError);
  document.addEventListener('click', uploadFormError);
  document.addEventListener('keydown', function (evt) {
    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();
      errorElement.remove();
      document.removeEventListener('click', uploadFormError);
    }
  });
};

// отправка формы
const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => uploadSuccess(),
      () => uploadError(),
      new FormData(evt.target),
    );
  })
};

// задание 6.2
const MAX_COMMENT_LENGTH = 140;
const MIN_HASHTAG_FIELD_LENGTH = 2;
const MAX_HASHTAG_FIELD_LENGTH = 104;


commentField.addEventListener('input', () => {
  const valueLength = commentField.value.length;
  if (valueLength > MAX_COMMENT_LENGTH) {
    commentField.setCustomValidity('Удалите лишние ' + (valueLength - MAX_COMMENT_LENGTH) + ' симв.');
  } else {
    commentField.setCustomValidity('');
  }
  commentField.reportValidity();
});

commentField.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
}, true);

commentField.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
}, true);

let checkHashtag = function () {
  if (hashtagField.value !== '') {
    let hashtags = hashtagField.value.split(' ');
    if (hashtags.length > 5) {
      hashtagField.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      return false;
    }
    let hashtags2 = [];
    for (let j = 0; j < hashtags.length; j++) {
      let hashtag = hashtags[j];
      if (hashtags2.indexOf(hashtag.toLowerCase()) > -1) {
        hashtagField.setCustomValidity('хеш-тег не может повторяться');
        return false;
      }
      hashtags2.push(hashtag.toLowerCase());
      if (j > 0 && hashtags[j - 1].split('').length < 2) {
        console.log('ошибка');
        hashtagField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        return false;
      }
      if (hashtag) {
        let letters = hashtag.split(''); // массив из букв
        for (let k = 0; k < letters.length; k++) {
          if (k === 0) {
            if (letters[k] !== '#') {
              hashtagField.setCustomValidity('хэш-тег должен начинаться с символа # (решётка)');
              return false;
            }
          } else {
            let regex = /^[a-zA-Z0-9а-яА-Я]+$/;
            if (!regex.test(letters[k])) {
              hashtagField.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
              return false;
            }
          }
          if (letters.length > 20) {
            hashtagField.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
            return false;
          }
        }
      }
    }
  }
};

hashtagField.addEventListener('input', () => {
  const valueLength = hashtagField.value.length;
  if (valueLength < MIN_HASHTAG_FIELD_LENGTH) {
    hashtagField.setCustomValidity('Ещё ' + (MIN_HASHTAG_FIELD_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_HASHTAG_FIELD_LENGTH) {
    hashtagField.setCustomValidity('Удалите лишние ' + (valueLength - MAX_HASHTAG_FIELD_LENGTH) + ' симв.');
  } else {
    hashtagField.setCustomValidity('');
  }
  checkHashtag();
  hashtagField.reportValidity();
});

hashtagField.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
}, true);

hashtagField.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
}, true);

export { setFormSubmit, toCloseForm }
