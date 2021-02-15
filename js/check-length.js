// Функция для проверки максимальной длины строки

let commentField = document.querySelector('.social__footer-text');
const MAX_COMMENT_LENGTH = 140;
commentField.maxlength = 160;

let checkCommentLenght = function(comment, maxLenght) {
  if(comment.maxlength<=maxLenght) {
    return 'true';
  } else {
    return 'false'
  }
}

export {commentField, MAX_COMMENT_LENGTH, checkCommentLenght};
