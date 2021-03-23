import { onEscapePress } from './form.js';
const pageBody = document.querySelector('body');

let createBigPicture = (bigFoto) => {
  const VISIBLE_COMMENTS_AMOUNT = 5;
  let openComentCount = VISIBLE_COMMENTS_AMOUNT;
  const bigPicture = document.querySelector('.big-picture');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').src = bigFoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigFoto.likes;
  bigPicture.querySelector('.social__caption').textContent = bigFoto.description;

  const commentList = document.querySelector('.social__comments');
  commentList.innerHTML = '';

  for (let i = 0; i < bigFoto.comments.length; i++) {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    let commentAvatar = bigFoto.comments[i].avatar;
    let commmentMessage = bigFoto.comments[i].message;
    let commmentName = bigFoto.comments[i].name;

    const avatarSrc = document.createElement('img');
    avatarSrc.classList.add('social__picture');
    commentElement.appendChild(avatarSrc);
    avatarSrc.src = commentAvatar;
    avatarSrc.alt = commmentName;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentElement.appendChild(commentText);
    commentText.textContent = commmentMessage;

    if (bigFoto.comments.length <= VISIBLE_COMMENTS_AMOUNT) {
      socialCommentCount.textContent = bigFoto.comments.length + ' из ' + bigFoto.comments.length + ' комментариев';
      commentsLoader.classList.add('hidden');
    } else {
      socialCommentCount.textContent = VISIBLE_COMMENTS_AMOUNT + ' из ' + bigFoto.comments.length + ' комментариев';
      commentsLoader.classList.remove('hidden');
    }
  }

  let comments = bigPicture.querySelectorAll('.social__comment');

  for (let j = VISIBLE_COMMENTS_AMOUNT; j < comments.length; j++) {
    comments[j].classList.add('hidden');
  }

  if (openComentCount < comments.length) {
    commentsLoader.addEventListener('click', () => {

      let newIndex = Math.min(comments.length, openComentCount + VISIBLE_COMMENTS_AMOUNT);
      for (let j = openComentCount; j < newIndex; j++) {
        comments[j].classList.remove('hidden');
      }

      bigPicture.querySelector('.social__comment-count').textContent = newIndex + ' из ' + bigFoto.comments.length + ' комментариев';
      openComentCount += VISIBLE_COMMENTS_AMOUNT;
      if (openComentCount >= comments.length) {
        openComentCount = VISIBLE_COMMENTS_AMOUNT;
        commentsLoader.classList.add('hidden');
      }

    });

  }
  pageBody.classList.add('modal-open');

  return bigPicture;
}

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const popupCloseHandler = () => {
  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');
};

bigPictureCancel.addEventListener('click', popupCloseHandler);
onEscapePress(popupCloseHandler);

export { createBigPicture, pageBody };
