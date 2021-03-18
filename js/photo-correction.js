const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
let imgUploadOverlay = document.querySelector('.img-upload__overlay');
let scale = document.querySelector('.scale');
let scaleControlSmaller = scale.querySelector('.scale__control--smaller');
let scaleControlBigger = scale.querySelector('.scale__control--bigger');
let scaleControlValue = scale.querySelector('.scale__control--value');
let imgUploadPreview = document.querySelector('.img-upload__preview');
let imgUpload = imgUploadPreview.querySelector('img');
let effectsRadio = document.querySelectorAll('.effects__radio');
let currentScaleValue = 100;
scaleControlValue.value = currentScaleValue + '%';
let formFieldset = document.querySelector('.img-upload__effect-level');

// изменение размера фото (шаг 25)

scaleControlSmaller.addEventListener('click', () => {
  let scaleValue = currentScaleValue;
  if (scaleValue > MIN_SCALE_VALUE) {
    let newValue = scaleValue - 25;
    currentScaleValue = newValue;
  } else { scaleValue == MIN_SCALE_VALUE }
  scaleControlValue.value = currentScaleValue + '%';
  imgUpload.style.transform = 'scale(' + currentScaleValue / 100 + ')';
  return currentScaleValue;
});

scaleControlBigger.addEventListener('click', () => {
  let scaleValue = currentScaleValue;
  if (scaleValue < MAX_SCALE_VALUE) {
    let newValue = scaleValue + 25;
    currentScaleValue = newValue;
  } else { scaleValue == MAX_SCALE_VALUE }
  scaleControlValue.value = currentScaleValue + '%';
  imgUpload.style.transform = 'scale(' + currentScaleValue / 100 + ')';
  return currentScaleValue;
});

// фильтры

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

// слайдер

let sliderElement = formFieldset.querySelector('.effect-level__slider');
let valueElement = formFieldset.querySelector('[name="effect-level"]');
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
    valueElement.value = values[handle];
  });

}

/*sliderElement.noUiSlider.on('update', (values, handle) => {
  if (imgUpload.classList.contains('effects__preview--marvin')) {
    valueElement.value = values[handle] + '%';
  }
  if (imgUpload.classList.contains('effects__preview--phobos')) {
    valueElement.value = values[handle] + 'px';
    console.log(valueElement.value);
  }
})
*/

/*
if (imgUpload.classList.contains('effects__preview--none')) {
  sliderElement.noUiSlider.destroy();

}
*/

imgUpload.style.filter = '';
if (imgUpload.classList.contains('effects__preview--chrome')) {
  imgUpload.style.filter = 'grayscale(1)';
}
if (imgUpload.classList.contains('effects__preview--sepia')) {
  imgUpload.style.filter = 'sepia(1)';
}
if (imgUpload.classList.contains('effects__preview--heat')) {
  imgUpload.style.filter = 'brightness(3)';
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

export { scaleControlValue, imgUpload };
