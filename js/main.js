import { renderSimilarList, PHOTO_COUNT, PHOTO_RANDOM_COUNT, imgFilter, setFilterDefault, setFilterRandom, setFilterDiscussed, sortPhoto } from './create-photo.js';
// import { createBigPicture, getId } from './big-photo.js';
import { setFormSubmit, toCloseForm } from './form.js';
import { getData } from './api.js';
// import './photo-correction.js';

// checkCommentLenght(commentField, MAX_COMMENT_LENGTH);
// document.addEventListener('click', getId);

getData((allFotos) => {
  renderSimilarList(allFotos.slice(0, PHOTO_COUNT));
  //setFilterDefault(renderSimilarList(allFotos.slice(0, PHOTO_COUNT))); // фильтр по умолчанию
  //setFilterRandom(renderSimilarList(allFotos.slice(0, PHOTO_RANDOM_COUNT))); // рандомный фильтр 10 фото
  //setFilterDiscussed(renderSimilarList(allFotos.sort((sortPhoto)))); // фильтр по кол-ву комментариев
  imgFilter.classList.remove('img-filters--inactive');
  console.log(allFotos);
});

setFormSubmit(toCloseForm);

// array.sort(() => Math.random() - Math.random()).slice(0, n)
