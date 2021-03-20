import { renderSimilarList, PHOTO_COUNT, PHOTO_RANDOM_COUNT, sortPhoto } from './create-photo.js';
import { setFormSubmit, closeForm } from './form.js';
import { getData, showFailMessage } from './api.js';
import { DEBOUNCE_INTERVAL, debounce } from './debounce.js';
import { imgFilter, filterButtonDefault, filterButtonRandom, filterButtonDiscussed, changeFilters } from './filters.js';
import './user-photo.js';
import './photo-correction.js';


getData(
  (allFotos) => {
    imgFilter.classList.remove('img-filters--inactive');

    if (filterButtonDefault.classList.contains('img-filters__button--active')) {
      debounce(renderSimilarList(allFotos), DEBOUNCE_INTERVAL);
    }

    filterButtonDefault.addEventListener('click', () => {
      changeFilters(filterButtonDefault, filterButtonRandom, filterButtonDiscussed);
      debounce(renderSimilarList(allFotos), DEBOUNCE_INTERVAL);
    });

    filterButtonRandom.addEventListener('click', () => {
      changeFilters(filterButtonRandom, filterButtonDefault, filterButtonDiscussed);
      debounce(renderSimilarList(allFotos.slice(0, PHOTO_RANDOM_COUNT)), DEBOUNCE_INTERVAL);
    });

    filterButtonDiscussed.addEventListener('click', () => {
      changeFilters(filterButtonDiscussed, filterButtonDefault, filterButtonRandom);
      debounce(renderSimilarList(allFotos.slice(0, PHOTO_COUNT).sort(sortPhoto).slice(0, PHOTO_COUNT)), DEBOUNCE_INTERVAL);
    });

    if (!filterButtonDiscussed.classList.contains('img-filters__button--active') && !filterButtonRandom.classList.contains('img-filters__button--active') && !filterButtonDefault.classList.contains('img-filters__button--active')) {
      debounce(renderSimilarList(allFotos.slice(0, PHOTO_COUNT)), DEBOUNCE_INTERVAL);
    }
  },
  (err) => { showFailMessage(err) },
);

setFormSubmit(closeForm);
