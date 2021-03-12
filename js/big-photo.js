//import {similarPhotos} from './create-photo.js';
// import {getRandomIntInclusive} from './util.js';
let pageBody = document.querySelector('body');

let createBigPicture = function (bigFoto) {
  let bigPicture = document.querySelector('.big-picture');
  // let commentCount = bigPicture.querySelector('.social__comment-count');
  // let commentsLoader = bigPicture.querySelector('.comments-loader');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').src = bigFoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigFoto.likes;
  bigPicture.querySelector('.social__caption').textContent = bigFoto.description;
  bigPicture.querySelector('.comments-count').textContent = bigFoto.comments.length;
  console.log(bigFoto.comments);
  for (let i = 0; i < bigFoto.comments.length; i++) {
    let commentAvatar = bigFoto.comments[i].avatar;
    let commmentText = bigFoto.comments[i].message;
    let commmentName = bigFoto.comments[i].name;
    let commentId = bigFoto.comments[i].id;
    console.log(commentId);
    let commentList = document.querySelector('.social__comments');
    commentList.innerHTML = '';
    bigFoto.comments.forEach(function () {
      commentList.innerHTML += '<li class="social__comment"></li>';
    });
    let commentElements = commentList.querySelectorAll('.social__comment');
    for (let f = 0; f < commentElements.length; f++) {
      let newComment = commentElements[f];
      newComment.id = commentId;
      console.log(newComment.id);
      commentElements[f].innerHTML = '<img class="social__picture" src="' + commentAvatar + '" class="social__picture" width="35" height="35" alt="' + commmentName + '">' + '<p class="social__text">' + commmentText + '</p>';
    }
  }

  pageBody.classList.add('modal-open');

  return bigPicture;
};

/*
Все комментарии к изображению выводятся в блок .social__comments.
 Сразу после открытия изображения в полноэкранном режиме отображается
 не более 5 комментариев. Пример разметки списка комментариев приведён
 в блоке .social__comments. Комментарий оформляется отдельным элементом
 списка li с классом social__comment. Аватарка автора комментария отображается
 в блоке .social__picture. Имя автора комментария отображается в атрибуте alt
 его аватарки. Текст комментария выводится в блоке .social__text.

Отображение дополнительных комментариев происходит при нажатии на кнопку
 .comments-loader. При нажатии на кнопку отображается не более 5 новых комментариев.

Если все комментарии показаны, кнопку .comments-loader следует скрыть, добавив класс hidden.
*/

let bigPicture = document.querySelector('.big-picture');
let bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

let closePopup = function () {
  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');
};

bigPictureCancel.addEventListener('click', closePopup);

document.addEventListener('keydown', function (evt) {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault;
    closePopup();
  }
});

/*
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
*/

export { createBigPicture, pageBody };

