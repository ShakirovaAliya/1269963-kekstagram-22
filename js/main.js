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

let commentField = document.querySelector('.social__footer-text');
const MAX_COMMENT_LENGTH = 140;

let checkCommentLenght = function(comment, maxLenght) {
  if(comment.maxlength<=maxLenght) {
    return 'true';
  } else {
    return 'false'
  }
}

commentField.maxlength = 160;
checkCommentLenght(commentField, MAX_COMMENT_LENGTH);


//  создание массива из 25 сгенерированных объектов

/*
let createArray = function (quantity) {
  let arr = [];
  for (let k = 1; k <= quantity; k++) {
    arr.push(k)
  }
  return arr;
};

const avatarArray = createArray(6);
const urlArray = createArray(25);
Math.floor(Math.random()*number);
*/


const namesArray = ['Артем', 'Иван', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

let createPhoto = function(count) {
  let photoArray = [];
  let commentsArray = [];
  let nameIndex = getRandomIntInclusive(0, namesArray.length-1);
  let avatarIndex = getRandomIntInclusive(1, 6);
  let photoUrlIndex = getRandomIntInclusive(1, 25);
  for (let j=0; j < 50; j++) {
    commentsArray.push({
      id: getRandomIntInclusive(1, 1000),
      avatar: 'img/avatar-'+ avatarIndex + '.svg',
      message: 'Всё отлично!',
      name: namesArray[nameIndex],
    })
  }
  for (let i = 0; i < count; i++) {
    photoArray.push({
      id: getRandomIntInclusive(1, 25),
      url: 'photos/' + photoUrlIndex + '.jpg',
      description: 'В целом всё неплохо. Но не всё.',
      likes: getRandomIntInclusive(15, 200),
      comments: commentsArray,
    })

  }
  return photoArray;
};

createPhoto(25);
// console.log(similarPhoto);
