let imgUploadOverlay = document.querySelector('.img-upload__overlay');
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

// изменение размера фото (шаг 25)

scaleControlSmaller.addEventListener('click', function () {
  let scaleValue = currentScaleValue;
  if (scaleValue > minScaleValue) {
    let newValue = scaleValue - 25;
    currentScaleValue = newValue;
  } else { scaleValue == minScaleValue }
  scaleControlValue.value = currentScaleValue + '%';
  imgUpload.style.transform = 'scale(' + currentScaleValue / 100 + ')';
  return currentScaleValue;
});

scaleControlBigger.addEventListener('click', function () {
  let scaleValue = currentScaleValue;
  if (scaleValue < maxScaleValue) {
    let newValue = scaleValue + 25;
    currentScaleValue = newValue;
  } else { scaleValue == minScaleValue }
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

let sliderElement = document.querySelector('.effect-level__slider');
let valueElement = document.querySelector('.effect-level__value');
valueElement.value = 1;

/*
window.onload = function() {
  console.log(sliderElement);
    sliderElement.noUiSlider.on('update', (values, handle) => {
      console.log(values, handle);
      valueElement.value = values[handle]
    });
};
*/

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

export {valueElement, scaleControlValue, imgUpload};
