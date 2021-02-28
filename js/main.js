import {checkCommentLenght} from './util.js';
import {getId} from './big-photo.js';
import {commentField, MAX_COMMENT_LENGTH} from './check-length.js';
import  './upload-form.js'

checkCommentLenght(commentField, MAX_COMMENT_LENGTH);
document.addEventListener('click', getId);
