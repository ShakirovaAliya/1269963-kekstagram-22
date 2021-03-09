import {getId} from './big-photo.js';
import {setFormSubmit, toCloseForm} from './form.js';
import './api.js';
import './photo-correction.js';

// checkCommentLenght(commentField, MAX_COMMENT_LENGTH);
document.addEventListener('click', getId);
setFormSubmit(toCloseForm);
