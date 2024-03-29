import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const STEP = 25;
let currentScaleValue = 100;
const scale = document.querySelector('.scale');
const scaleControlSmaller = scale.querySelector('.scale__control--smaller');
const scaleControlBigger = scale.querySelector('.scale__control--bigger');
const scaleControlValue = scale.querySelector('.scale__control--value');
scaleControlValue.value = currentScaleValue + '%';
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUpload = imgUploadPreview.querySelector('img');
const effectsRadio = document.querySelectorAll('.effects__radio');
const effectNoneRadio = document.querySelector('#effect-none');
const effectMarvinRadio = document.querySelector('#effect-marvin');
const effectPhobosRadio = document.querySelector('#effect-phobos');
const effectHeatRadio = document.querySelector('#effect-heat');
const effectChromeRadio = document.querySelector('#effect-chrome');
const effectSepiaRadio = document.querySelector('#effect-sepia');
const formFieldset = document.querySelector('.img-upload__effect-level');
const sliderElement = formFieldset.querySelector('.effect-level__slider');
const valueElement = formFieldset.querySelector('[name="effect-level"]');

// изменение размера фото (шаг 25)

scaleControlSmaller.addEventListener('click', () => {
  let scaleValue = currentScaleValue;
  if (scaleValue > MIN_SCALE_VALUE) {
    let newValue = scaleValue - STEP;
    currentScaleValue = newValue;
  } else { scaleValue === MIN_SCALE_VALUE }
  scaleControlValue.value = currentScaleValue + '%';
  imgUpload.style.transform = 'scale(' + currentScaleValue / MAX_SCALE_VALUE + ')';
  return currentScaleValue;
});

scaleControlBigger.addEventListener('click', () => {
  let scaleValue = currentScaleValue;
  if (scaleValue < MAX_SCALE_VALUE) {
    let newValue = scaleValue + STEP;
    currentScaleValue = newValue;
  } else { scaleValue === MAX_SCALE_VALUE }
  scaleControlValue.value = currentScaleValue + '%';
  imgUpload.style.transform = 'scale(' + currentScaleValue / MAX_SCALE_VALUE + ')';
  return currentScaleValue;
});

// фильтры - слайдер

let selectFilter = '';

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => {
      return parseFloat(value);
    },
  },
});

const filterStyleNames = {
  'chrome': { 'style': 'grayscale', minval: 0, maxval: 1, step: 0.1, 'unit': '' },
  'sepia': { 'style': 'sepia', minval: 0, maxval: 1, step: 0.1, 'unit': '' },
  'marvin': { 'style': 'invert', minval: 0, maxval: 100, step: 1, 'unit': '%' },
  'phobos': { 'style': 'blur', minval: 0, maxval: 3, step: 0.1, 'unit': 'px' },
  'heat': { 'style': 'brightness', minval: 1, maxval: 3, step: 0.1, 'unit': '' },
};

formFieldset.classList.add('hidden');
const changeFilterIntensity = (button, minValue, maxValue, step) => {
  button.addEventListener('change', (evt) => {
    formFieldset.classList.remove('hidden');

    if (evt.target.checked) {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: minValue,
          max: maxValue,
        },
        start: maxValue,
        step: step,
        format: {
          to: (value) => {
            if (Number.isInteger(value)) {
              return value.toFixed(0);
            }
            return value.toFixed(1);
          },
          from: (value) => {
            return parseFloat(value);
          },
        },
      })
    }
  })
}

for (let i = 0; i < effectsRadio.length; i++) {
  let checkedRadio = effectsRadio[i];
  let radioValue = checkedRadio.value;
  let newClassName = 'effects__preview--' + radioValue;
  checkedRadio.addEventListener('click', () => {
    imgUpload.className = '';
    imgUpload.classList.add(newClassName);
    selectFilter = radioValue;
    imgUpload.style.filter = '';
  })
}

sliderElement.noUiSlider.on('update', (values, handle) => {
  valueElement.value = values[handle];
  if (selectFilter !== '') {
    imgUpload.style.filter =
      filterStyleNames[selectFilter].style + '(' + valueElement.value + filterStyleNames[selectFilter].unit + ')';
  }
})


const resetFilters = (button) => {
  button.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      formFieldset.classList.add('hidden');
    }
  },
  )
};

changeFilterIntensity(effectChromeRadio, 0, 1, 0.1);
changeFilterIntensity(effectSepiaRadio, 0, 1, 0.1);
changeFilterIntensity(effectMarvinRadio, 0, 100, 1);
changeFilterIntensity(effectHeatRadio, 1, 3, 0.1);
changeFilterIntensity(effectPhobosRadio, 0, 3, 0.1);

resetFilters(effectNoneRadio);

export { scaleControlValue, imgUpload };
