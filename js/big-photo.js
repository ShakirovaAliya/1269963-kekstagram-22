//import {similarPhotos} from './create-photo.js';
// import { getRandomIntInclusive } from './util.js';
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
  console.log(bigFoto.comments); // массив из объектов-комментариев

  for (let i = 0; i < bigFoto.comments.length; i++) {
    console.log(bigFoto.comments[i].avatar);
    console.log(bigFoto.comments[i].id);
    console.log(bigFoto.comments[i].name);
    console.log(bigFoto.comments[i].message);
    let commentAvatar = bigFoto.comments[i].avatar;
    let commmentMessage = bigFoto.comments[i].message;
    let commmentName = bigFoto.comments[i].name;
    let commentId = bigFoto.comments[i].id;
    let commentList = document.querySelector('.social__comments');
    commentList.innerHTML = '';
    bigFoto.comments.forEach(function () {
      commentList.innerHTML += '<li class="social__comment"></li>';
    });
    let commentElements = commentList.querySelectorAll('.social__comment');
    console.log(commentList);
    for (let k = 0; k < commentElements.length; k++) {
      commentElements[k].id = commentId;
      console.log(commentElements[k].id);
      let avatarSrc = document.createElement('img');
      avatarSrc.classList.add('social__picture');
      commentElements[k].appendChild(avatarSrc);
      avatarSrc.src = commentAvatar;
      avatarSrc.alt = commmentName;
      console.log(bigFoto.comments[i].avatar);
      console.log(avatarSrc.alt);
      let commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentElements[k].appendChild(commentText);
      commentText.textContent = commmentMessage;
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

