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

import {getRandomIntInclusive} from './random-number.js';

const PHOTO_COUNT = 25;
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

const createPhotos = () => new Array(PHOTO_COUNT).fill(null).map(() => createPhoto());
const similarPhotos = createPhotos();
const similarPictureBlock = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotoFragment = document.createDocumentFragment();

similarPhotos.forEach((foto) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = foto.url;
  pictureElement.querySelector('.picture__likes').textContent = foto.likes;
  pictureElement.querySelector('.picture__comments').textContent = foto.comments;
  similarPhotoFragment.appendChild(pictureElement);
});

similarPictureBlock.appendChild(similarPhotoFragment);

export {createPhoto};
