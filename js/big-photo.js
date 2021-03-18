let pageBody = document.querySelector('body');

let createBigPicture = function (bigFoto) {
  let bigPicture = document.querySelector('.big-picture');
  //let commentCount = bigPicture.querySelector('.social__comment-count');
  let commentsLoader = bigPicture.querySelector('.comments-loader');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').src = bigFoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigFoto.likes;
  bigPicture.querySelector('.social__caption').textContent = bigFoto.description;
  if (bigFoto.comments.length <= 4) {
    bigPicture.querySelector('.social__comment-count').textContent = bigFoto.comments.length + ' из ' + bigFoto.comments.length + ' комментариев';
    commentsLoader.classList.add('hidden');
  } else {
    bigPicture.querySelector('.social__comment-count').textContent = 5 + ' из ' + bigFoto.comments.length + ' комментариев';
    commentsLoader.classList.remove('hidden');
  }

  //console.log(bigFoto.comments); // массив из объектов-комментариев
  let commentList = document.querySelector('.social__comments'); // список комментариев
  commentList.innerHTML = ''; // очищаем список
  console.log(bigFoto.comments);

  for (let i = 0; i < bigFoto.comments.length; i++) {
    let commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentList.appendChild(commentElement);

    let commentAvatar = bigFoto.comments[i].avatar;
    let commmentMessage = bigFoto.comments[i].message;
    let commmentName = bigFoto.comments[i].name;

    let avatarSrc = document.createElement('img');
    avatarSrc.classList.add('social__picture');
    commentElement.appendChild(avatarSrc);
    avatarSrc.src = commentAvatar;
    avatarSrc.alt = commmentName;

    let commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentElement.appendChild(commentText);
    commentText.textContent = commmentMessage;

    let comments = bigPicture.querySelectorAll('.social__comment');

    for (let j = 5; j < comments.length; j++) {
      comments[j].classList.add('hidden');

      if (j >= 5 && j < 10) {
        commentsLoader.addEventListener('click', function () {
          comments[j].classList.remove('hidden');
          bigPicture.querySelector('.social__comment-count').textContent = 10 + ' из ' + bigFoto.comments.length + ' комментариев';
          return comments[j];
        });
        commentsLoader.removeEventListener('click', function () {
          comments[j].classList.remove('hidden');
        });
      }
    }
  }

  pageBody.classList.add('modal-open');

  return bigPicture;
}

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

export { createBigPicture, pageBody };
