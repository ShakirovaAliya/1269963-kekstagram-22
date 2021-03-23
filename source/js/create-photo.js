import { createBigPicture } from './big-photo.js';

// создание массива из 25 сгенерированных объектов

const similarPictureBlock = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderSimilarList = (similarPhotos) => {
  const similarPhotoFragment = document.createDocumentFragment();

  similarPhotos.slice()
    .forEach((foto) => {
      const pictureElement = similarPictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = foto.url;
      pictureElement.querySelector('.picture__likes').textContent = foto.likes;
      pictureElement.querySelector('.picture__comments').textContent = foto.comments.length;
      const pictures = document.querySelectorAll('.picture');
      pictures.forEach((item) => { item.parentNode.removeChild(item) })
      similarPhotoFragment.appendChild(pictureElement);
      pictureElement.addEventListener('click', () => {
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

export { renderSimilarList, sortPhoto, similarPictureBlock }
