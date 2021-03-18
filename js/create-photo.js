import { createBigPicture } from './big-photo.js';

// создание массива из 25 сгенерированных объектов
const PHOTO_COUNT = 25;
const PHOTO_RANDOM_COUNT = 10;
const similarPictureBlock = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderSimilarList = (similarPhotos) => {
  const similarPhotoFragment = document.createDocumentFragment();

  similarPhotos
    .forEach((foto) => {
      const pictureElement = similarPictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = foto.url;
      pictureElement.querySelector('.picture__likes').textContent = foto.likes;
      pictureElement.querySelector('.picture__comments').textContent = foto.comments.length;
      // pictureElement.dataset.id = foto.id;
      //similarPhotoFragment.innerHTML = '';
      similarPhotoFragment.appendChild(pictureElement);
      pictureElement.addEventListener('click', function () {
        createBigPicture(foto);
      });
    });
  similarPictureBlock.appendChild(similarPhotoFragment);
}

let sortPhoto = (a, b) => {
  if (a.comments > b.comments) {
    return -1;
  }
  if (a.likcomments < b.comments) {
    return 1;
  }
  return 0;
};

export { renderSimilarList, PHOTO_COUNT, PHOTO_RANDOM_COUNT, sortPhoto, similarPictureBlock }
