// Функция, возвращающая случайное целое число из переданного диапазона включительно

let getRandomIntInclusive = function(min, max) {
  if(min>=0 && max>=min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {return undefined}
}

console.log(getRandomIntInclusive(2, 180));

// Функция для проверки максимальной длины строки

let commentField = document.querySelector('.social__footer-text');
const MAX_COMMENT_LENGTH = 140;

let checkCommentLenght = function(comment, maxLenght) {
if(comment.maxlength<=maxLenght) {
  return 'true';
} else { return 'false'}
}

commentField.maxlength = 160;

console.log(checkCommentLenght(commentField, MAX_COMMENT_LENGTH));

// имя_функции(проверяемая_строка, максимальная длина);
// Результат: true, если строка проходит по длине, и false — если не проходит
