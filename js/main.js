import { renderSimilarList, PHOTO_COUNT, PHOTO_RANDOM_COUNT, imgFilter, setFilterDefault, setFilterRandom, setFilterDiscussed, sortPhoto } from './create-photo.js';
import { setFormSubmit, toCloseForm } from './form.js';
import { getData, toShowFailMessage } from './api.js';
// import './photo-correction.js';

getData(
  (allFotos) => { renderSimilarList(allFotos.slice(0, PHOTO_COUNT)) },
  (err) => { toShowFailMessage(err) },
  imgFilter.classList.remove('img-filters--inactive'),
)

//renderSimilarList(allFotos.slice(0, PHOTO_COUNT))); // фильтр по умолчанию
//renderSimilarList(allFotos.slice(0, PHOTO_RANDOM_COUNT))); // рандомный фильтр 10 фото
//renderSimilarList(allFotos.sort((sortPhoto)))); // фильтр по кол-ву комментариев

setFormSubmit(toCloseForm);
