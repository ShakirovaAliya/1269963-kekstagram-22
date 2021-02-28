import {similarPhotos} from './create-photo.js';
let pageBody = document.querySelector('body');

let createBigPicture = function (bigFoto) {
  let bigPicture = document.querySelector('.big-picture');
  let commentCount= bigPicture.querySelector('.social__comment-count');
  let commentsLoader = bigPicture.querySelector('.comments-loader');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').src = bigFoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigFoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigFoto.comments;
  bigPicture.querySelector('.social__caption').textContent = bigFoto.description;
  let socialPicture = bigPicture.querySelector('.social__picture');
  let socialText = bigPicture.querySelector('.social__text');
  socialPicture.innerHTML = '';
  socialText.textContent = '';
  socialPicture.innerHTML += '<img src="' + bigFoto.comments.avatar + 'class="social__picture" width="35" height="35" alt="' + bigFoto.comments.name +'">';
  socialText.textContent += bigFoto.comments.message;
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  pageBody.classList.add('modal-open');

  return bigPicture;
};


let bigPicture = document.querySelector('.big-picture');
let bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

let closePopup = function() {
  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');
};

bigPictureCancel.addEventListener('click', closePopup);
document.addEventListener('keydown', function(evt) {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault;
    closePopup();
  }
});

let getId = function (evt) {
  let target = evt.target;
  let dataPicture;
  if (target.className === 'picture') {
    let photoId = target.dataset.id;
    dataPicture = similarPhotos.find(function (element) {
      return element.id === Number(photoId);
    });
    createBigPicture(dataPicture);
  }
};

export {getId, pageBody};

