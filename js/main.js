import { renderSimilarList, PHOTO_COUNT, PHOTO_RANDOM_COUNT, sortPhoto } from './create-photo.js';
import { setFormSubmit, toCloseForm } from './form.js';
import { getData, toShowFailMessage } from './api.js';
import { DEBOUNCE_INTERVAL, debounce } from './debounce.js';
import './user-photo.js';
// import './photo-correction.js';

let imgFilter = document.querySelector('.img-filters');
let filterButtonDefault = imgFilter.querySelector('#filter-default');
let filterButtonRandom = imgFilter.querySelector('#filter-random');
let filterButtonDiscussed = imgFilter.querySelector('#filter-discussed');
filterButtonDefault.classList.remove('img-filters__button--active');
const similarPictureBlock = document.querySelector('.pictures');


getData(
  (allFotos) => {
    debounce(renderSimilarList(allFotos));
    imgFilter.classList.remove('img-filters--inactive');

    filterButtonDefault.addEventListener('click', function () {
      similarPictureBlock.innerHTML = '';
      if (!filterButtonDefault.classList.contains('img-filters__button--active')) {
        filterButtonDefault.classList.add('img-filters__button--active');
        filterButtonRandom.classList.remove('img-filters__button--active');
        filterButtonDiscussed.classList.remove('img-filters__button--active');
      } else {
        filterButtonDefault.classList.remove('img-filters__button--active');
      }
      debounce(renderSimilarList(allFotos.slice(0, PHOTO_COUNT)), DEBOUNCE_INTERVAL);
    });
    filterButtonRandom.addEventListener('click', function () {
      similarPictureBlock.innerHTML = '';
      if (!filterButtonRandom.classList.contains('img-filters__button--active')) {
        filterButtonRandom.classList.add('img-filters__button--active');
        filterButtonDefault.classList.remove('img-filters__button--active');
        filterButtonDiscussed.classList.remove('img-filters__button--active');
      } else {
        filterButtonRandom.classList.remove('img-filters__button--active');
      }
      debounce(renderSimilarList(allFotos.slice(0, PHOTO_RANDOM_COUNT)), DEBOUNCE_INTERVAL);
    });
    filterButtonDiscussed.addEventListener('click', function () {
      similarPictureBlock.innerHTML = '';
      if (!filterButtonDiscussed.classList.contains('img-filters__button--active')) {
        filterButtonDiscussed.classList.add('img-filters__button--active');
        filterButtonDefault.classList.remove('img-filters__button--active');
        filterButtonRandom.classList.remove('img-filters__button--active');
      } else {
        filterButtonDiscussed.classList.remove('img-filters__button--active');
      }
      debounce(renderSimilarList(allFotos.slice(0, PHOTO_COUNT).sort(sortPhoto).slice(0, PHOTO_COUNT)), DEBOUNCE_INTERVAL);

    });
    if (!filterButtonDiscussed.classList.contains('img-filters__button--active') && !filterButtonRandom.classList.contains('img-filters__button--active') && !filterButtonDefault.classList.contains('img-filters__button--active')) {
      debounce(renderSimilarList(allFotos.slice(0, PHOTO_COUNT)), DEBOUNCE_INTERVAL);
    }
  },
  (err) => { toShowFailMessage(err) },
);

// renderSimilarList(allFotos.slice(0, PHOTO_COUNT)); // фильтр по умолчанию
// renderSimilarList(allFotos.slice(0, PHOTO_RANDOM_COUNT)) рандомный фильтр 10 фото
// renderSimilarList(allFotos.sort(sortPhoto).slice(0, PHOTO_COUNT); // фильтр по кол-ву комментариев

setFormSubmit(toCloseForm);
