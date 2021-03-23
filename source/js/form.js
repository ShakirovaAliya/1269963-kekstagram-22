import { pageBody } from './big-photo.js';
import { sendData } from './api.js';
import { scaleControlValue, imgUpload } from './photo-correction.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_FIELD_LENGTH = 104;
const MAX_ONE_HASHTAG_LENGTH = 20;
const MIN_ONE_HASHTAG_LENGTH = 2;
const MAX_HASHTAGS_AMOUNT = 5;
const DEFAULT_SCALE_CONTROL_VALUE = 100;
const imgUploadInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const tagMain = document.querySelector('main');
const commentField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');
const effectNoneRadio = document.querySelector('#effect-none');
const formFieldset = document.querySelector('.img-upload__effect-level');

// открытие-закрытие формы

const resetForm = () => {
  imgUploadInput.value = '';
  hashtagField.value = '';
  commentField.value = '';
  scaleControlValue.value = DEFAULT_SCALE_CONTROL_VALUE + '%';
  effectNoneRadio.checked = true;
  formFieldset.classList.add('hidden');
  imgUpload.style.transform = 'scale(1)';
  imgUpload.className = '';
  imgUpload.style.filter = '';
}


const formOpenHandler = () => {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
};

const formCloseHandler = () => {
  resetForm();
  imgUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscPress);
};


const onEscapePress = (onEmit, handler) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      onEmit();
      document.removeEventListener('click', handler);
    }
  })
}

const onPopupEscPress = () => {
  onEscapePress(formCloseHandler);
};

imgUploadInput.addEventListener('input', formOpenHandler);
uploadCancel.addEventListener('click', formCloseHandler);

// сообщение об успешной отправке

const uploadSuccess = () => {
  const successMessage = document.querySelector('#success').content.querySelector('.success');
  const successMessageElement = successMessage.cloneNode(true);
  successMessageElement.classList.add('success__element');
  tagMain.appendChild(successMessageElement);
  imgUploadOverlay.classList.add('hidden');
  resetForm();
  const successElement = document.querySelector('.success__element');
  const successButton = successElement.querySelector('.success__button');
  const formUploadSuccessHandler = () => {
    successElement.remove();
  };
  successButton.addEventListener('click', formUploadSuccessHandler);
  document.addEventListener('click', formUploadSuccessHandler);
  onEscapePress(formUploadSuccessHandler, formUploadSuccessHandler);
};

// сообщение о неуспешной отправке

const uploadError = () => {
  const errorMessage = document.querySelector('#error').content.querySelector('.error');
  const errorMessageElement = errorMessage.cloneNode(true);
  errorMessageElement.classList.add('error__element');
  tagMain.appendChild(errorMessageElement);
  imgUploadOverlay.classList.add('hidden');
  resetForm();
  const errorElement = document.querySelector('.error__element');
  const errorButton = errorElement.querySelector('.error__button');
  const formUploadErrorHandler = () => {
    errorElement.remove();
  };
  errorButton.addEventListener('click', formUploadErrorHandler);
  document.addEventListener('click', formUploadErrorHandler);
  const errorElementRemoveHandler = () => {
    errorElement.remove();
  }

  onEscapePress(errorElementRemoveHandler, formUploadErrorHandler);

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

// валидация полей ввода хештегов и комментария

commentField.addEventListener('input', () => {
  const valueLength = commentField.value.length;
  if (valueLength > MAX_COMMENT_LENGTH) {
    commentField.setCustomValidity('Удалите лишние ' + (valueLength - MAX_COMMENT_LENGTH) + ' симв.');
  } else {
    commentField.setCustomValidity('');
  }
  commentField.reportValidity();
});

commentField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onPopupEscPress);
}, true);

commentField.addEventListener('blur', () => {
  document.addEventListener('keydown', onPopupEscPress);
}, true);

const checkHashtag = (tag) => {
  if (tag) {
    let letters = tag.split('');
    for (let k = 0; k < letters.length; k++) {
      if (k === 0) {
        if (letters[k] !== '#') {
          hashtagField.setCustomValidity('хэш-тег должен начинаться с символа # (решётка)');
          return false;
        }
      } else {
        const regex = /^[a-zA-Z0-9а-яА-Я]+$/;
        if (!regex.test(letters[k])) {
          hashtagField.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
          return false;
        }
      }
      if (letters.length > MAX_ONE_HASHTAG_LENGTH) {
        hashtagField.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        return false;
      }
    }
  }
}

const checkHashtags = () => {
  if (hashtagField.value !== '') {
    let hashtags = hashtagField.value.split(' ');
    if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
      hashtagField.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      return false;
    }
    let uniqueHashtags = [];
    for (let j = 0; j < hashtags.length; j++) {
      let hashtag = hashtags[j];
      if (uniqueHashtags.indexOf(hashtag.toLowerCase()) > -1) {
        hashtagField.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
        return false;
      }
      uniqueHashtags.push(hashtag.toLowerCase());
      if (j > 0 && hashtags[j - 1].split('').length < MIN_ONE_HASHTAG_LENGTH) {
        hashtagField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        return false;
      }
      checkHashtag(hashtag);
    }
  }
}

hashtagField.addEventListener('input', () => {
  const valueLength = hashtagField.value.length;
  if (valueLength > MAX_HASHTAG_FIELD_LENGTH) {
    hashtagField.setCustomValidity('Удалите лишние ' + (valueLength - MAX_HASHTAG_FIELD_LENGTH) + ' симв.');
  } else {
    hashtagField.setCustomValidity('');
  }
  checkHashtags();
  hashtagField.reportValidity();
});

hashtagField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onPopupEscPress);
}, true);

hashtagField.addEventListener('blur', () => {
  document.addEventListener('keydown', onPopupEscPress);
}, true);

export { setFormSubmit, formCloseHandler, tagMain, onEscapePress }
