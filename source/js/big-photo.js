let pageBody = document.querySelector('body');

let createBigPicture = (bigFoto) => {
  const VISIBLE_COMMENTS_AMOUNT = 5;
  let openComentCount = VISIBLE_COMMENTS_AMOUNT;
  let bigPicture = document.querySelector('.big-picture');
  let commentsLoader = bigPicture.querySelector('.comments-loader');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').src = bigFoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigFoto.likes;
  bigPicture.querySelector('.social__caption').textContent = bigFoto.description;

  let commentList = document.querySelector('.social__comments');
  commentList.innerHTML = '';
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

    if (bigFoto.comments.length <= VISIBLE_COMMENTS_AMOUNT) {
      bigPicture.querySelector('.social__comment-count').textContent = bigFoto.comments.length + ' из ' + bigFoto.comments.length + ' комментариев';
      commentsLoader.classList.add('hidden');
    } else {
      bigPicture.querySelector('.social__comment-count').textContent = VISIBLE_COMMENTS_AMOUNT + ' из ' + bigFoto.comments.length + ' комментариев';
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

let bigPicture = document.querySelector('.big-picture');
let bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

let closePopup = () => {
  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');
};

bigPictureCancel.addEventListener('click', closePopup);

document.addEventListener('keydown', (evt) => {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault;
    closePopup();
  }
});

export { createBigPicture, pageBody };
