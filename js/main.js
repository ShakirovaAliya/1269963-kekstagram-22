// import {checkCommentLenght} from './util.js';
import {getId} from './big-photo.js';
// import {commentField, MAX_COMMENT_LENGTH} from './check-length.js';
import './upload-form.js';
import './api.js';

// checkCommentLenght(commentField, MAX_COMMENT_LENGTH);
document.addEventListener('click', getId);

fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((smallPhotos) => {
    console.log(smallPhotos);
  });
