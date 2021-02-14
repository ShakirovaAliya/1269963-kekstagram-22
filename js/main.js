import {createPhoto} from './create-photo.js';
import {commentField, MAX_COMMENT_LENGTH, checkCommentLenght} from './check-length.js';

createPhoto(25);
checkCommentLenght(commentField, MAX_COMMENT_LENGTH);
