//  создание массива из 25 сгенерированных объектов

// import { getRandomIntInclusive } from './util.js';
import { createBigPicture } from './big-photo.js';

const PHOTO_COUNT = 25;
const PHOTO_RANDOM_COUNT = 10;
// const namesArray = ['Артем', 'Иван', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

/*
let createPhoto = function (count) {
  let photoArray = [];
  let commentsArray = [];
  let nameIndex = getRandomIntInclusive(0, namesArray.length - 1);
  let avatarIndex = getRandomIntInclusive(1, 6);
  let photoUrlIndex = getRandomIntInclusive(1, 25);
  for (let j = 0; j < 50; j++) {
    commentsArray.push({
      id: getRandomIntInclusive(1, 1000),
      avatar: 'img/avatar-' + avatarIndex + '.svg',
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
*/

// const createPhotos = () => new Array(PHOTO_COUNT).fill(null).map(() => createPhoto());
// const similarPhotos = createPhotos();
const similarPictureBlock = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
let imgFilter = document.querySelector('.img-filters');
let filterButtonDefault = imgFilter.querySelector('#filter-default');
let filterButtonRandom = imgFilter.querySelector('#filter-random');
let filterButtonDiscussed = imgFilter.querySelector('#filter-discussed');


const clearSimilarList = () => {
  let picturesElement= document.querySelectorAll('.picture');
  picturesElement.forEach((element) => {
    element.innerHTML = '';
  })
};

const renderSimilarList = (similarPhotos) => {
  const similarPhotoFragment = document.createDocumentFragment();

  similarPhotos
  .forEach((foto) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = foto.url;
    pictureElement.querySelector('.picture__likes').textContent = foto.likes;
    pictureElement.querySelector('.picture__comments').textContent = foto.comments.length;
    // pictureElement.dataset.id = foto.id;
    similarPhotoFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', function () {
      createBigPicture(foto);
    });
  });
  clearSimilarList();
  similarPictureBlock.appendChild(similarPhotoFragment);
  console.log(similarPictureBlock);
}

let setFilterDefault = function() {
  filterButtonDefault.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!filterButtonDefault.classList.contains('img-filters__button--active')) {
      filterButtonDefault.classList.add('img-filters__button--active');
      filterButtonRandom.classList.remove('img-filters__button--active');
      filterButtonDiscussed.classList.remove('img-filters__button--active');
    }
  })
}

let setFilterRandom = function() {
  filterButtonRandom.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!filterButtonRandom.classList.contains('img-filters__button--active')) {
      filterButtonRandom.classList.add('img-filters__button--active');
      filterButtonDefault.classList.remove('img-filters__button--active');
      filterButtonDiscussed.classList.remove('img-filters__button--active');
    }
  })
}

let setFilterDiscussed = function() {
  filterButtonDiscussed.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!filterButtonDiscussed.classList.contains('img-filters__button--active')) {
      filterButtonDiscussed.classList.add('img-filters__button--active');
      filterButtonDefault.classList.remove('img-filters__button--active');
      filterButtonRandom.classList.remove('img-filters__button--active');
    }
  })
}

let sortPhoto = function(a, b) {
  if(a.comments > b.comments) {
    return -1;
  }
  if(a.likcomments < b.comments) {
    return 1;
  }
  return 0;
};
export { renderSimilarList, PHOTO_COUNT, PHOTO_RANDOM_COUNT, imgFilter, setFilterDefault, setFilterRandom, setFilterDiscussed, sortPhoto}
