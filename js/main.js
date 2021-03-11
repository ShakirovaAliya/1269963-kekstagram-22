import { renderSimilarList, PHOTO_COUNT } from './create-photo.js';
// import { createBigPicture, getId } from './big-photo.js';
import { setFormSubmit, toCloseForm } from './form.js';
import { getData } from './api.js';
// import './photo-correction.js';

// checkCommentLenght(commentField, MAX_COMMENT_LENGTH);
// document.addEventListener('click', getId);

getData((allFotos) => {
  renderSimilarList(allFotos.slice(0, PHOTO_COUNT));
});

setFormSubmit(toCloseForm);
