import {isEscapeKey} from './util.js';

const START_INDEX = 0;
const LIMIT = 5;

const bigPictureModal = document.querySelector('.big-picture');
const pictureBox = bigPictureModal.querySelector('.big-picture__preview');
const pictureElement = pictureBox.querySelector('img');
const likeCount = pictureBox.querySelector('.likes-count');
const pictureCaption = pictureBox.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const commentsContainer = pictureBox.querySelector('.social__comments');
const commentCountRender = pictureBox.querySelector('.comments-count-render');
const commentCountTotal = pictureBox.querySelector('.comments-count');
const commentsLoader = pictureBox.querySelector('.comments-loader');
const bigPictureModalCloseElement = document.querySelector('.big-picture__cancel');


const createCommentElement = ({avatar, message, name}) => {
  const commentItem = commentTemplate.cloneNode(true);
  commentItem.querySelector('.social__picture').src = avatar;
  commentItem.querySelector('.social__picture').alt = name;
  commentItem.querySelector('.social__text').textContent = message;
  return commentItem;
};

const renderComments = (item) => {
  commentsContainer.append(...item.map(createCommentElement));
};

const closePictureModal = () => {
  document.body.classList.remove('modal-open');
  bigPictureModal.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const addComments = () => {
  let currentIndex = START_INDEX;
  let currentLimit = LIMIT;

  return (arr) => {
    const resultComments = [];
    currentLimit += currentIndex;
    const newComments = arr.slice(LIMIT);

    for (currentIndex; currentIndex < currentLimit && currentIndex < newComments.length; currentIndex++) {
      resultComments.push(newComments[currentIndex]);
    }
    renderComments(resultComments);
  };
};

const openBigPictureModal = (url, likes, comments, description) => {
  pictureElement.src = url;
  pictureElement.alt = description;
  likeCount.textContent = likes;
  pictureCaption.textContent = description;
  commentCountTotal.textContent = comments.length;

  commentsContainer.innerHTML = '';
  const commentsInitial = comments.slice(START_INDEX, LIMIT);
  renderComments(commentsInitial);

  commentCountRender.textContent = commentsContainer.querySelectorAll('.social__comment').length;

  if(comments.length > 5) {
    const renderAddComments = addComments();

    commentsLoader.addEventListener('click', () => {
      renderAddComments(comments);
      commentCountRender.textContent = commentsContainer.querySelectorAll('.social__comment').length;

      if(commentsContainer.querySelectorAll('.social__comment').length === comments.length) {
        commentsLoader.classList.add('hidden');
      }

    });
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }

  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
}

bigPictureModalCloseElement.addEventListener('click', closePictureModal);

export {openBigPictureModal};
