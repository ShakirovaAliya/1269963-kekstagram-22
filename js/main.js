import { renderSimilarList, PHOTO_COUNT, PHOTO_RANDOM_COUNT, sortPhoto } from './create-photo.js';
import { setFormSubmit, toCloseForm } from './form.js';
import { getData, toShowFailMessage } from './api.js';
// import './photo-correction.js';

let imgFilter = document.querySelector('.img-filters');
let filterButtonDefault = imgFilter.querySelector('#filter-default');
let filterButtonRandom = imgFilter.querySelector('#filter-random');
let filterButtonDiscussed = imgFilter.querySelector('#filter-discussed');
filterButtonDefault.classList.remove('img-filters__button--active');
const similarPictureBlock = document.querySelector('.pictures');

getData(
  (allFotos) => {
    renderSimilarList(allFotos);
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
      renderSimilarList(allFotos.slice(0, PHOTO_COUNT));
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
      renderSimilarList(allFotos.slice(0, PHOTO_RANDOM_COUNT));
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
      renderSimilarList(allFotos.sort(sortPhoto).slice(0, PHOTO_COUNT));
    });
    if (!filterButtonDiscussed.classList.contains('img-filters__button--active') && !filterButtonRandom.classList.contains('img-filters__button--active') && !filterButtonDefault.classList.contains('img-filters__button--active')) {
      renderSimilarList(allFotos.slice(0, PHOTO_COUNT));
    }
  },
  (err) => { toShowFailMessage(err) },
);


// renderSimilarList(allFotos.slice(0, PHOTO_COUNT)); // фильтр по умолчанию
// renderSimilarList(allFotos.slice(0, PHOTO_RANDOM_COUNT)) рандомный фильтр 10 фото
// renderSimilarList(allFotos.sort(sortPhoto).slice(0, PHOTO_COUNT); // фильтр по кол-ву комментариев

setFormSubmit(toCloseForm);
