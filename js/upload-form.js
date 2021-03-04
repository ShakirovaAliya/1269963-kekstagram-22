//upload
import { pageBody } from './big-photo.js';

let imgUploadInput = document.querySelector('#upload-file');
let imgUploadOverlay = document.querySelector('.img-upload__overlay');
let uploadCancel = document.querySelector('#upload-cancel');

let onPopupEscPress = function (evt) {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
    toCloseForm();
  }
};

let toOpenForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
};

let toCloseForm = function () {
  imgUploadInput.value = '';
  imgUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscPress);
};

imgUploadInput.addEventListener('input', toOpenForm);
uploadCancel.addEventListener('click', toCloseForm);

let scale = document.querySelector('.scale');
let scaleControlSmaller = scale.querySelector('.scale__control--smaller');
let scaleControlBigger = scale.querySelector('.scale__control--bigger');
let scaleControlValue = scale.querySelector('.scale__control--value');
let imgUploadPreview = document.querySelector('.img-upload__preview');
let imgUpload = imgUploadPreview.querySelector('img');
let effectsRadio = document.querySelectorAll('.effects__radio');
let currentScaleValue = 100;
let maxScaleValue = 100;
let minScaleValue = 25;
scaleControlValue.value = currentScaleValue + '%';

scaleControlSmaller.addEventListener('click', function () {
  let scaleValue = currentScaleValue;
  if(scaleValue > minScaleValue) {
    let newValue = scaleValue - 25;
    currentScaleValue = newValue;
  } else {scaleValue == minScaleValue}
  scaleControlValue.value = currentScaleValue + '%';
  imgUpload.style.transform = 'scale(' + currentScaleValue / 100 + ')';
  return currentScaleValue;
});

scaleControlBigger.addEventListener('click', function () {
  let scaleValue = currentScaleValue;
  if(scaleValue < maxScaleValue) {
    let newValue = scaleValue + 25;
    currentScaleValue = newValue;
  } else {scaleValue == minScaleValue}
  scaleControlValue.value = currentScaleValue + '%';
  imgUpload.style.transform = 'scale(' + currentScaleValue / 100 + ')';
  return currentScaleValue;
});

for (let i = 0; i < effectsRadio.length; i++) {
  let checkedRadio = effectsRadio[i];
  let radioValue = checkedRadio.value;
  let newClassName = 'effects__preview--' + radioValue;
  checkedRadio.addEventListener('click', function () {
    if (imgUpload.classList.contains(newClassName)) {
      imgUpload.classList.remove(newClassName);
      imgUpload.className = '';
    }
    imgUpload.classList.add(newClassName);
  })
}

let sliderElement = document.querySelector('.effect-level__slider');
let valueElement = document.querySelector('.effect-level__value');
valueElement.value = 1;

if (imgUploadOverlay.className !== 'hidden') {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  sliderElement.noUiSlider.on('update', (values, handle) => {
    valueElement.value = values[handle]
  });
}

if (imgUpload.classList.contains('effects__preview--none')) {
  // sliderElement.noUiSlider.destroy();

} else {
  sliderElement.noUiSlider.on('update', (values, handle) => {
    if (imgUpload.classList.contains('effects__preview--marvin')) {
      valueElement.value = values[handle] + '%';
    }
    if (imgUpload.classList.contains('effects__preview--phobos')) {
      valueElement.value = values[handle] + 'px';
    }
  })
}

if (imgUpload.classList.contains('effects__preview--chrome')) {
  imgUpload.style.filter = 'grayscale(0..1)';
}
if (imgUpload.classList.contains('effects__preview--sepia')) {
  imgUpload.style.filter = 'sepia(0..1)';
}
if (imgUpload.classList.contains('effects__preview--heat')) {
  imgUpload.style.filter = 'brightness(1..3)';
}
if (imgUpload.classList.contains('effects__preview--marvin')) {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  })
  imgUpload.style.filter = 'invert(0..100%)';
}
if (imgUpload.classList.contains('effects__preview--phobos')) {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });
  imgUpload.style.filter = 'blur(0..3px)';
}


// задание 6.2
let commentField = document.querySelector('.text__description');
let hashtagField = document.querySelector('.text__hashtags');

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

commentField.addEventListener('focus', function() {
  document.removeEventListener('keydown', onPopupEscPress);
}, true);

commentField.addEventListener('blur', function() {
  document.addEventListener('keydown', onPopupEscPress);
}, true);


hashtagField.addEventListener('input', () => {
  const valueLength = hashtagField.value.length;
  if (valueLength < MIN_HASHTAG_FIELD_LENGTH) {
    hashtagField.setCustomValidity('Ещё ' + (MIN_HASHTAG_FIELD_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_HASHTAG_FIELD_LENGTH) {
    hashtagField.setCustomValidity('Удалите лишние ' + (valueLength - MAX_HASHTAG_FIELD_LENGTH) + ' симв.');
  } else {
    hashtagField.setCustomValidity('');
  }
  hashtagField.reportValidity();
});

hashtagField.addEventListener('input', () => {
  if (hashtagField.value !== '') {
    let hashtagArray = [];
    let hashtagList = hashtagField.value.split(' ');
    hashtagArray.push(hashtagList);
    console.log(hashtagArray);
    if (hashtagList) {
      for (let j = 0; j < hashtagList.length; j++) {
        let arrayOfWorld = hashtagList[j].split(' ');
        arrayOfWorld.length = 20;
        if (arrayOfWorld[0] !== '#') {
          hashtagField.setCustomValidity('хэш-тег должен начинаться с символа # (решётка)');
        } else {
          hashtagField.setCustomValidity('');
        }
      }
    }
  }
});

hashtagField.addEventListener('focus', function() {
  document.removeEventListener('keydown', onPopupEscPress);
}, true);

hashtagField.addEventListener('blur', function() {
  document.addEventListener('keydown', onPopupEscPress);
}, true);

/*document.addEventListener('keydown', function (evt) {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault;
    toCloseForm();
  }
});

commentField.focus(function(evt) {
  evt.stopPropagation();
})

*/

/*
if(hashtag.value) {
  let splits = hashtag.value.split(' ');
  splits.length = 5;
  for (let j = 0; j < splits.length; j++) {
    let arrayOfWorld = splits[j].split('#');
    arrayOfWorld.length = 20;
    if (arrayOfWorld[0] !== '#') {
      hashtag.setCustomValidity('хэш-тег должен начинаться с символа # (решётка)');
    } else {
      hashtag.setCustomValidity('');
    }
  }
}
*/

/*
Для валидации хэш-тегов вам придётся вспомнить, как работать
с массивами. Набор хэш-тегов можно превратить в массив, воспользовавшись
методом split. Он разбивает строки на массивы. После этого, вы можете
написать цикл, который будет ходить по полученному массиву и проверять
каждый из хэш-тегов на предмет соответствия ограничениям. Если хотя бы один
из тегов не проходит нужных проверок, можно воспользоваться методом
setCustomValidity для того, чтобы задать полю правильное сообщение об ошибке.
*/

/*
        Хэш-теги:
хэш-тег начинается с символа # (решётка);
строка после решётки должна состоять из букв и чисел и
не может содержать пробелы, спецсимволы (#, @, $ и т. п.),
символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
хеш-тег не может состоять только из одной решётки;
максимальная длина одного хэш-тега 20 символов, включая решётку;
хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
хэш-теги разделяются пробелами;
один и тот же хэш-тег не может быть использован дважды;
нельзя указать больше пяти хэш-тегов;
если фокус находится в поле ввода хэш-тега, нажатие на
Esc не должно приводить к закрытию формы редактирования изображения.


        Комментарий:
если фокус находится в поле ввода комментария, нажатие
на Esc не должно приводить к закрытию формы редактирования изображения.
*/
