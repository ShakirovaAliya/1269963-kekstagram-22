// Функция, возвращающая случайное целое число из переданного диапазона включительно

let getRandomIntInclusive = function(min, max) {
  if(min>=0 && max>=min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    return null
  }
};

// Функция для проверки максимальной длины строки

let checkCommentLenght = function(comment, MAX_LENGTH) {
  if(comment.maxlength<=MAX_LENGTH) {
    return 'true';
  } else {
    return 'false'
  }
}

export {checkCommentLenght, getRandomIntInclusive};
